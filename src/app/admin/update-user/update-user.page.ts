import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/modelos/User';
import { DataService } from '../../services/data.service';
import { Message } from 'src/app/modelos/Message';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, sendEmailVerification } from "firebase/auth";
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  //variables
  agregarUsuariosForm: FormGroup;
  idUpdate: string;
  tipoPassword: boolean = false;
  sesionIniciada: boolean = false;

  //Variables para la imagen
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  imagenOriginal = '';
  id = '';
  file;
  previsualizarImagen = '';

  constructor(private fb: FormBuilder, private _dataService: DataService, private _router: ActivatedRoute, private afAuth: AngularFireAuth,
    private sanitizer: DomSanitizer, private storage: AngularFireStorage, private toastCtrl: ToastController, private route:Router) {
    this.agregarUsuariosForm = this.fb.group({
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      password: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
      name: [{value: '', disabled: true}, Validators.required],
      surname: ['', Validators.required],
      numberCongress: [0, Validators.required],
      location: ['', [Validators.required, Validators.maxLength(10)]],
      birthday: ['', Validators.required],
      imagePath: [''],
      range: [0, Validators.required],
    });
  }

  ngOnInit() {
    this.getUsuarioPorId();
  }

  //recoger todo el usuario
  getUsuarioPorId() {
    this.idUpdate = this._router.snapshot.paramMap.get('id');

    this._dataService.getUsuarioPorId(this.idUpdate).subscribe(
      result => {
        this.agregarUsuariosForm.patchValue({
          email: result.data().email,
          password: result.data().password,
          name: result.data().name,
          surname: result.data().surname,
          numberCongress: result.data().numberCongress,
          location: result.data().location,
          birthday: result.data().birthday,
          imagePath: result.data().imagePath,
          range: result.data().range
        })
        this.file = this.agregarUsuariosForm.get('imagePath').value;
        this.imagenOriginal = this.file;

        //comprobamos si el usuario a editar es el que tiene la sesion iniciada
        this.sesionUsuario();
      }, error => {
        console.log(error);
      }
    )
  }

  sesionUsuario(){
    //recogemos de localStorage la key de user que viene con un email
    const user = JSON.parse(localStorage.getItem('user'));

    //en caso de ser el mismo email que el de la persona que se esta editando pasamos la sesionIniciada a true
    if(user.email == this.agregarUsuariosForm.get('email').value){
      this.sesionIniciada = true;
    }
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

  //metodo para actualizar el usuario
  actualizarImagen() {
    if (this.file === this.imagenOriginal) {
      //metodo actualizar usuario
      this.editarUsuario();
    } else {
      //metodo actualizar imagen y metodo actualizar usuario

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
              
              //metodo actualizar usuario
              this.editarUsuario();
            })
        })).subscribe()
      } else {
        //metodo actualizar usuario
        this.editarUsuario();
      }
    }
  }

  editarUsuario(){
    let birthday = this.agregarUsuariosForm.get("birthday").value;
    birthday = format(parseISO(birthday), 'yyyy-MM-dd');
    
    this.agregarUsuariosForm.get("birthday").setValue(birthday);

    this._dataService.editarUsuario(this.idUpdate, this.agregarUsuariosForm.value).then(result => {
      let toast = this.toastCtrl.create({
        message: 'Usuario editado correctamente',
        duration: 5000,
        position: 'bottom',
        color: 'success'
      }).then((data) => {
        data.present();
      })

      //comprobamos si la variable sesion iniciada es true en caso de serlo actualizamos el user-complete de localStorage
      if(this.sesionIniciada == true){
        //removemos el localstorage de user-complete
        localStorage.removeItem('user-complete');
        //volvemos acrear el localstorage de user-complete
        localStorage.setItem('user-complete',JSON.stringify(this.agregarUsuariosForm.value));

        this.route.navigate(['admin/users']);
      }else{
        //en caso de no serlo solo volvemos al listado de usuarios
        this.route.navigate(['admin/users']);
      }
    }).catch(error => {
      console.log(error);
    })
  }

  /*
  -----------------------------------------------------------------------------------------
  METODOS PARA LA IMAGEN
  -----------------------------------------------------------------------------------------
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

}
