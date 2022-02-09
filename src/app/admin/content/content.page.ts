import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Content } from 'src/app/modelos/Content';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  contenidoForm: FormGroup;
  selector: number = 0;
  contenidoTotal: Array<Content>=[];

  constructor(private _dataService: DataService, private fb: FormBuilder) {
    this.contenidoForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      imagePath: '',
      content: ['', Validators.required],
      //tipo 0 circulo, 1 noticia, 2 revista
      type: [0, Validators.required],
    })
  }

  ngOnInit() {
    this.getContenido();
  }

  seleccionarApartado(valor: number) {
    this.selector = valor;
  }

  //metodo para crear contenido
  crearContenido() {
    //llamada al servicio pasando el formulario
    this._dataService.crearContenido(this.contenidoForm.value).then(data => {
      this.contenidoForm.patchValue({
        title: '',
        subtitle: '',
        imagePath: '',
        content: '',
        type: 0
      })
    }).catch(error => {
      console.log(error);
    })
  }

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

  borrarContenido(codigo:string){
    //llamada al servicio para borrar el contenido
    this._dataService.borrarContenido(codigo).then(data => {
    }).catch(error =>{
      console.log("entra");
    })
  }

}
