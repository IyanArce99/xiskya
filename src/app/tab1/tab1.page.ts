import { Component, OnInit } from '@angular/core';
import { User } from '../modelos/User';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  p: number = 1;
  usuarios:Array<User>;
  usuariosFiltrados:Array<User> = [];
  filterValue: string = '';

  constructor(private _dataService:DataService) {}

  ngOnInit(): void {
    this.recogerUsuarios();
  }

  recogerUsuarios(){
    this.usuarios = [];
    this._dataService.getUsuarios().subscribe(
      result => {
        result.forEach(element => {
          this.usuarios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
        this.usuariosFiltrados = this.usuarios;
      }, error => {

      }
    )
  }

  filter(e) {
    this.usuariosFiltrados = Object.assign([], this.usuarios);

    this.usuariosFiltrados = this.usuariosFiltrados.filter(usuario => {
      let nameComplete = usuario.name.toLowerCase() + ' ' + usuario.surname.toLowerCase();

      return nameComplete.indexOf(e.target.value.toLowerCase()) >= 0;
    });
  }
}
