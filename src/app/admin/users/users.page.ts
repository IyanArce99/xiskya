import { Component, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/modelos/User';
import { DataService } from '../../services/data.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DomSanitizer } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController } from '@ionic/angular';
import { Message } from 'src/app/modelos/Message';
import { ModalController } from '@ionic/angular';
import { ModalResetPage } from '../../pages/modal-reset/modal-reset.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit, OnDestroy {
  //paginacion
  p: number = 1;

  //variables
  subscriptionUser: Subscription = new Subscription();
  selector: number = 0;
  agregarUsuariosForm: FormGroup;
  usuarios: Array<User> = [];
  usuario: User;
  tipoPassword: boolean = false;
  messages: Array<Message> = [];

  //Variables para imagen
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  id = '';
  file: any = [];
  previsualizarImagen: string;

  constructor(private fb: FormBuilder, private _dataService: DataService, private afAuth: AngularFireAuth, private storage: AngularFireStorage,
    private sanitizer: DomSanitizer, private toastCtrl: ToastController, private modalController: ModalController) {
    this.agregarUsuariosForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      numberCongress: [0, Validators.required],
      location: ['', [Validators.required, Validators.maxLength(10)]],
      birthday: ['', Validators.required],
      imagePath: [''],
      range: [0, Validators.required],
    }), this.tipoPassword = true;
  }

  ngOnInit() {
    this.getUsuarios();
  }

  ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
  }

  seleccionarApartado(valor: number) {
    this.selector = valor;
  }

  //metodo para comprobar el tipo del input password para hacerla visible o no
  comprobarPasswordTipo() {
    this.tipoPassword = !this.tipoPassword;
    const passwordCambio: any = document.querySelector('#password');
    if (passwordCambio.type == 'password') {
      passwordCambio.type = "text";
    } else {
      passwordCambio.type = 'password';
    }
  }

  //modal reset
  async openModal(email: any) {
    const modal = await this.modalController.create({
      component: ModalResetPage,
      cssClass: 'modalCustomizado',
      componentProps: {
        'email': email,
      }
    });

    return await modal.present();
  }

  //metodo para guardar la imagen
  guardarImagen() {
    //comprobamos si existe fichero en caso de no existir pasamos directamente a añadir el contenido
    if (this.file.name != undefined) {
      //creamos una ruta para la imagen
      const filePath = `users/${this.id}`;

      //le pasamos la referencia al storage de firebase
      const ref = this.storage.ref(filePath);
      //subimos el fichero a esa referencia creada
      const tarea = this.storage.upload(filePath, this.file);
      //usando como referencia la variable tarea guardamos en una variable llamada this.urlImage la url de la imagen recien subida
      tarea.snapshotChanges().pipe(finalize(() => {
        ref.getDownloadURL().subscribe(
          result => {
            //guardamos la imagen en una variable subscribe
            this.urlImage = result;
            //pasamos esa imagen al form
            this.agregarUsuariosForm.get("imagePath").setValue(this.urlImage);
            //llamamos al metodo de crear contenido
            this.registrarUsuario();
          })
      })).subscribe()
    } else {
      this.registrarUsuario();
    }
  }

  registrarUsuario() {
    //guardamos los datos del formulario en un objeto de tipo user
    const email = this.agregarUsuariosForm.get("email").value;
    const name = this.agregarUsuariosForm.get("name").value;
    const surname = this.agregarUsuariosForm.get("surname").value;
    const numberCongress = this.agregarUsuariosForm.get("numberCongress").value;
    const location = this.agregarUsuariosForm.get("location").value;
    const birthday = this.agregarUsuariosForm.get("birthday").value;
    const imagePath = this.agregarUsuariosForm.get("imagePath").value;
    const range = this.agregarUsuariosForm.get("range").value;
    const password = this.agregarUsuariosForm.get("password").value;

    this.usuario = {
      email: email,
      password: password,
      name: name,
      surname: surname,
      numberCongress: numberCongress,
      location: location,
      birthday: birthday,
      imagePath: imagePath,
      range: range,
      messages: this.messages
    }

    /* 
      !!Nota: antes de crear el usuario guardamos el que esta logueado ya que firebase actualiza el token de inicio de sesion una vez se crea el usuario
      una vez creado el usuario volvemos a loguear el usuario anterior
    */
    const usuarioLoguear = JSON.parse(localStorage.getItem('user'));
    
    this.afAuth.createUserWithEmailAndPassword(email, password).then(result => {
      //deslogueamos al usuario que se acaba de crear
      this.afAuth.signOut();
      //logueamos al usuario que ya estaba anteriormente
      this.afAuth.signInWithEmailAndPassword(usuarioLoguear.email,usuarioLoguear.password).then(result=>{
        this.agregarUsuario();
      }).catch(error=>{
        console.log(error);
      })
    }).catch(error => {
      console.log(error);
    })
  }

  agregarUsuario() {
    this._dataService.crearUsuario(this.usuario).then(data => {
      this.agregarUsuariosForm.patchValue({
        email: '',
        password: '',
        name: '',
        surname: '',
        numberCongress: 0,
        location: '',
        birthday: '',
        imagePath: '',
        range: 0
      })
      this.limpiarContenidoPrevisualizacion();

      let toast = this.toastCtrl.create({
        message: 'Usuario agregado correctamente',
        duration: 3000,
        position: 'bottom',
        color: 'success'
      }).then((data) => {
        data.present();
      })

    }).catch(error => {
      console.log(error);
    })
  }

  getUsuarios() {
    this.subscriptionUser = this._dataService.getUsuarios().subscribe(
      data => {
        this.usuarios = [];
        data.forEach(element => {
          this.usuarios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
      }, error => {
        console.log(error);
      }
    )
  }

  borrarUsuario(codigo: string) {
    this._dataService.borrarUsuario(codigo).then(data => {
    }).catch(error => {
      console.log(error);
    })
  }

  /*
  ------------------------------------------------------------
  Metodos para la imagen
  ------------------------------------------------------------
  */
  onUpload(e) {
    //creamos un id unico para la imagen
    this.id = Math.random().toString(36).substring(2);

    //guardamos todos los datos de la imagen elegida
    this.file = e.target.files[0];

    //llamamos al metodo para mostrar la imagen, asi el usuario podra ver la imagen elegida
    this.mostrarImagen(this.file);
  }

  mostrarImagen(imagenDestacada) {
    //guardamos en una constante el archivo
    const imagenVisualizar = imagenDestacada;
    //limpiamos la previsualizacion
    this.previsualizarImagen = "";

    //extraemos su base 64 de cara a poder previsualizar la imagen
    this.extraerBase64(imagenVisualizar).then((imagen: any) => {
      //guardamos la base de la imagen para previsualizarla
      this.previsualizarImagen = imagen.base;
    });
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();

      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }

  })

  limpiarContenidoPrevisualizacion() {
    this.previsualizarImagen = '';
    this.file = [];
  }
}
