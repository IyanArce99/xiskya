import { Component, OnInit } from '@angular/core';
import { User } from '../modelos/User';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  usuario:User;

  constructor() { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario(){
    const datoUsuario = JSON.parse(localStorage.getItem('user-complete'));
    this.usuario = datoUsuario;
  }

}
