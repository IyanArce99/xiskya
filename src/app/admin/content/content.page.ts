import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Content } from 'src/app/modelos/Content';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  config = {
    placeholder: 'Contenido',
    tabsize: 2,
    height: 200,
    toolbar: [
        ['font', ['bold', 'italic', 'underline', 'strikethrough','clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
    ]
  }

  //paginacion
  p: number = 1;

  //Variables
  contenidoForm: FormGroup;
  selector: number = 0;
  contenidoTotal: Array<Content> = [];
  mostrarPdf: boolean = true;

  //Variables para imagen
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  id = '';
  file:any = [];
  previsualizarImagen:string;

  //variables para el pdf
  filePdf:any = [];
  idPdf = '';
  urlPdf: Observable <string>;


  constructor(private _dataService: DataService, private fb: FormBuilder, private storage: AngularFireStorage, private sanitizer: DomSanitizer,
    private toastCtrl: ToastController) {
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
    this.getContenido();
  }

  //metodo para moverse entre las pestañas ver contenido y crear contenido
  seleccionarApartado(valor: number) {
    this.selector = valor;
  }

  //metodo para mostrar o no el input de pdfs
  comprobarContenido(tipo){
    this.mostrarPdf = (tipo == 2 || tipo==0) ? true : false;
  }

  //metodo para guardar la imagen
  guardarImagen() {
    //comprobamos si existe fichero en caso de no existir pasamos directamente a añadir el pdf
    if (this.file.name != undefined) {
      //creamos una ruta para la imagen
      const filePath = `uploads/${this.id}`;

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
            //llamamos al metodo de crear contenido
            this.guardarPdf();
          })
      })).subscribe()
    } else {
      this.guardarPdf();
    }
  }

  guardarPdf(){
    //comprobamos que el tipo de contenido sean revistas
    const tipo = this.contenidoForm.get("type").value;
    //en caso de ser revistas guardamos el pdf
    if(tipo == 2 || tipo==0){
      //creamos una ruta para la imagen
      const filePath = `pdf/${this.idPdf}`;

      //le pasamos la referencia al storage de firebase
      const ref = this.storage.ref(filePath);
      //subimos el fichero a esa referencia creada
      const tarea = this.storage.upload(filePath, this.filePdf);
      //usando como referencia la variable tarea guardamos en una variable llamada this.urlPdf la url del pdf recien subido
      tarea.snapshotChanges().pipe(finalize(() => {
        ref.getDownloadURL().subscribe(
          result => {
            //guardamos la imagen en una variable subscribe
            this.urlPdf = result;
            //pasamos esa imagen al form
            this.contenidoForm.get("pdfPath").setValue(this.urlPdf);
            //llamamos al metodo de crear contenido
            this.crearContenido();
          })
      })).subscribe()
    }else{
      this.crearContenido();
    }
  }

  //metodo para crear contenido
  crearContenido() {
    //llamada al servicio pasando el formulario
    this._dataService.crearContenido(this.contenidoForm.value).then(data => {
      //limpiamos el formulario
      this.contenidoForm.patchValue({
        title: '',
        subtitle: '',
        imagePath: '',
        pdfPath: '',
        content: '',
        type: 0
      })

      let toast = this.toastCtrl.create({
        message: 'Contenido agregado correctamente',
        duration: 3000,
        position: 'bottom',
        color: 'success'
      }).then((data) => {
        data.present();
      })
      this.mostrarPdf = true;

      //llamamos al metodo para limpiar el contenido de la previsualizacion
      this.limpiarContenidoPrevisualizacion();
    }).catch(error => {
      console.log(error);
    })
  }

  //metodo para recoger el contenido
  getContenido() {
    //llamada al servicio para recoger el contenido
    this._dataService.getContenido().subscribe(
      data => {
        //limpiamos el array que usaremos para mostrar el contenido
        this.contenidoTotal = [];
        //recorremos los datos en un for each para ir pusheandolos al array mencionado anteriormente
        data.forEach(element => {
          this.contenidoTotal.push({
            //guardamos a su vez el id del documento
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
      }, error => {
        console.log(error);
      }
    )
  }

  //metodo para borrar el contenido
  borrarContenido(codigo: string) {
    //llamada al servicio para borrar el contenido
    this._dataService.borrarContenido(codigo).then(data => {
      let toast = this.toastCtrl.create({
        message: 'Contenido borrado correctamente',
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

  /*
  ---------------------------------------------------------------------------------------
  metodos para las imagenes
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

  /*
  ---------------------------------------------------------------------------------------
  metodos para los pdfs
  -----------------------------------------------------------------------------------------
  */
  onUploadPdf(e){
    //creamos un id unico para el pdf
    this.idPdf = Math.random().toString(36).substring(2);

    //guardamos todos los datos de la imagen elegida
    this.filePdf = e.target.files[0];
  } 

  /*
  ---------------------------------------------------------------------------------------
  previsualizacion imagenes
  -----------------------------------------------------------------------------------------
  */
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

  limpiarContenidoPrevisualizacion(){
    this.previsualizarImagen = '';
    this.file = [];
    this.filePdf = [];
  }
}
