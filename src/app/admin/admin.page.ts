import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  usuario:any;

  constructor() { }

  recogerUsuario(){
    this.usuario = JSON.parse(localStorage.getItem('user-complete'));
  }

  ngOnInit() {
    this.recogerUsuario()
  }

}
