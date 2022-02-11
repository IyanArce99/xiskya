import { Component, OnInit } from '@angular/core';
import { User } from '../modelos/User';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  usuario:User;
  public me: any;
  public you: any;
  constructor() { }

  ngOnInit() {
    this.getUsuario();
    this.me = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";
    this.you = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";
  }

  getUsuario(){
    const datoUsuario = JSON.parse(localStorage.getItem('user-complete'));
    this.usuario = datoUsuario;
  }

}
