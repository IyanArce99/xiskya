import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Content } from 'src/app/modelos/Content';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-update-content',
  templateUrl: './update-content.page.html',
  styleUrls: ['./update-content.page.scss'],
})
export class UpdateContentPage implements OnInit {
  //Variables
  contenidoForm: FormGroup;
  idUpdate: string;
  mostrarPdf: boolean = true;
  imagenOriginal = '';
  pdfOriginal = '';

  //Variables imagen
  idImagen = '';
  file;
  previsualizarImagen = '';
  urlImage: Observable<string>;

  //Variables pdf
  idPdf = '';
  filePdf;
  urlPdf: Observable<string>;

  constructor(private fb: FormBuilder, private _dataService: DataService, private _router: ActivatedRoute, private afAuth: AngularFireAuth,
    private sanitizer: DomSanitizer, private storage: AngularFireStorage, private toastCtrl: ToastController, private route: Router) {
    this.contenidoForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      imagePath: '',
      pdfPath: '',
      content: ['', Validators.required],
      //tipo 0 circulo, 1 noticia, 2 revista
      type: [0, Validators.required],
    })
  }

  ngOnInit() {
    this.getContenidoPorId();
  }

  mostrarBotonPdf() {
    const pdfDato = this.contenidoForm.get("type").value;
    this.mostrarPdf = (pdfDato == 2 || pdfDato == 0) ? true : false;
  }

  /*
  ---------------------------------------------------------------
  Metodos para recoger los datos del contenido especifico
  ---------------------------------------------------------------
  */
  getContenidoPorId() {
    this.idUpdate = this._router.snapshot.paramMap.get('id');

    this._dataService.getContenidoPorId(this.idUpdate).subscribe(
      result => {
        this.contenidoForm.patchValue({
          title: result.data().title,
          subtitle: result.data().subtitle,
          content: result.data().content,
          type: result.data().type,
          imagePath: result.data().imagePath,
          pdfPath: result.data().pdfPath
        })

        if (result.data().type == 2) {
          this.mostrarPdf = true;
        }

        //guardamos en el archivo file y en el archivo imagenOriginal la ruta de la imagen actual
        this.file = this.contenidoForm.get("imagePath").value;
        this.imagenOriginal = this.file;

        //guardamos en el archivo filePdf y en el archivo pdfOriginal la ruta del pdf actual
        this.filePdf = this.contenidoForm.get("pdfPath").value;
        this.pdfOriginal = this.filePdf;
      }, error => {
        console.log(error);
      }
    )
  }

  /*
  ---------------------------------------------------------------
  Metodos para recoger la imagen del input y mostrar una previsualizacion
  ---------------------------------------------------------------
  */
  onUpload(e) {
    //creamos un id unico para la imagen
    this.idImagen = Math.random().toString(36).substring(2);

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

  /*
  ---------------------------------------------------------------
  Metodos para recoger el pdf del input
  ---------------------------------------------------------------
  */
  onUploadPdf(e) {
    //creamos un id unico para la imagen
    this.idPdf = Math.random().toString(36).substring(2);

    //guardamos todos los datos de la imagen elegida
    this.filePdf = e.target.files[0];
  }

  /*
  ---------------------------------------------------------------
  Metodos para actualizar el contenido
  ---------------------------------------------------------------
  */
  actualizarImagen() {
    if (this.file != this.imagenOriginal) {
      //las imagenes son distintas por lo que hay que guardar la nueva imagen y modificar el campo del formulario
      //comprobamos si existe fichero en caso de no existir pasamos directamente a comprobar el pdf
      if (this.file.name != undefined) {
        //creamos una ruta para la imagen
        const filePath = `uploads/${this.idImagen}`;

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
              this.contenidoForm.get("imagePath").setValue(this.urlImage);

              //metodo comprobar pdf
              this.comprobarPdf();
            })
        })).subscribe()
      } else {
        //metodo comprobar pdf
        this.comprobarPdf();
      }
    } else {
      //las imagenes son iguales pasamos a comprobar el pdf
      this.comprobarPdf();
    }
  }

  comprobarPdf() {
    //primero comprobamos si el tipo es revista ya que solo las revistas tienen pdfs
    const typeRevista = this.contenidoForm.get("type").value;

    if (typeRevista == 2 || typeRevista == 0) {
      //es revista ahora comprobamos si se modifico el pdf
      if (this.filePdf != this.pdfOriginal) {
        //guardamos el nuevo pdf
        //comprobamos si existe fichero en caso de no existir pasamos directamente a añadir el contenido
        if (this.filePdf.name != undefined) {
          //creamos una ruta para el pdf
          const filePath = `pdf/${this.idPdf}`;

          //le pasamos la referencia al storage de firebase
          const ref = this.storage.ref(filePath);
          //subimos el fichero a esa referencia creada
          const tarea = this.storage.upload(filePath, this.filePdf);
          //usando como referencia la variable tarea guardamos en una variable llamada this.urlPdf la url del pdf recien subido
          tarea.snapshotChanges().pipe(finalize(() => {
            ref.getDownloadURL().subscribe(
              result => {
                //guardamos el pdf en una variable subscribe
                this.urlPdf = result;
                //pasamos ese pdf al form
                this.contenidoForm.get("pdfPath").setValue(this.urlPdf);

                //metodo actualizar contenido
                this.actualizarContenido();
              })
          })).subscribe()
        } else {
          //metodo actualizar contenido
          this.actualizarContenido();
        }
      } else {
        //no se modifico por lo que vamos directamente a actualizar el resto de datos
        this.actualizarContenido();
      }
    } else {
      //no es revista por lo que limpiamos la variable de pdfPath y vamos a actualizar el resto de datos
      this.contenidoForm.get("pdfPath").setValue('');
      this.actualizarContenido();
    }
  }

  actualizarContenido() {
    this._dataService.editarContenido(this.idUpdate, this.contenidoForm.value).then(result => {
      let toast = this.toastCtrl.create({
        message: 'Contenido editado correctamente',
        duration: 1500,
        position: 'bottom',
        color: 'success'
      }).then((data) => {
        data.present();
      })

      this.route.navigate(['admin/content']);
    }).catch(error => {
      console.log(error);
    })
  }

}
