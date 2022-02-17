import { Component, AfterViewInit } from '@angular/core';
import { User } from '../modelos/User';
import { Content } from '../modelos/Content';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit{
  //paginacion
  p: number = 1;

  //Variables
  usuario: User;
  contenidoTotal: Array<Content> = [];
  selector:number = 0;
  contenidoFiltrado: Array<Content> = [];
  //public notices: any;
  
  constructor(private _dataService:DataService, private _router:Router) { }

  ngAfterViewInit() {
    this.getUsuario();
  }
  //-------------------------------------------------------------------------

  getUsuario() {
    const dato = JSON.parse(localStorage.getItem('user-complete'));
    this.usuario = dato;

    this.getContenidos();
  }

  getContenidos() {
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

        this.contenidoFiltrado = this.contenidoTotal.filter((fi) => fi.type == this.selector);
      }, error => {
        console.log(error);
      }
    )
  }

  filtrarContenido(filtro:number){
    this.contenidoFiltrado = [];
    this.selector = filtro;
    this.contenidoFiltrado = this.contenidoTotal.filter((fi) => fi.type == filtro);
  }

}
