import { Component, OnInit } from '@angular/core';
import { User } from '../modelos/User';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  usuario:User;
  editarLocationType: boolean = false;
  editarNumberCongressType: boolean = false;
  usuarioForm:FormGroup

  constructor(private fb:FormBuilder, private _dataService:DataService) {
    this.usuarioForm = this.fb.group ({
      location: '',
      numberCongress: ''
    })
   }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario(){
    const datoUsuario = JSON.parse(localStorage.getItem('user-complete'));
    this.usuario = datoUsuario;
    this.usuarioForm.get("location").setValue(this.usuario.location);
    this.usuarioForm.get("numberCongress").setValue(this.usuario.numberCongress);
  }

  cambiarEditLocation(){
    this.editarLocationType = !this.editarLocationType;
  }

  editLocation(){
    //limpiamos el localstorage del usuario completo
    localStorage.removeItem('user-complete');

    //guardamos en la variable usuario el nuevo cambio
    this.usuario.location = this.usuarioForm.get("location").value;

    //editamos el usuario en firebase
    this._dataService.editarUsuario(this.usuario.id, this.usuario).then(data => {
      //en caso de que edite correctamente volvemos a crear el localStorage de user-complete
      localStorage.setItem('user-complete', JSON.stringify(this.usuario));

      //recargamos la pagina para que se vean los cambios
      window.location.reload();
    }).catch(error => {
      console.log(error);
    })
  }

  cambiarEditNumberCongress(){
    this.editarNumberCongressType = !this.editarNumberCongressType;
  }

  editNumberCongress(){
    //limpiamos el localstorage del usuario completo
    localStorage.removeItem('user-complete');

    //guardamos en la variable usuario el nuevo cambio
    this.usuario.numberCongress = this.usuarioForm.get("numberCongress").value;

    //editamos el usuario en firebase
    this._dataService.editarUsuario(this.usuario.id, this.usuario).then(data => {
      //en caso de que edite correctamente volvemos a crear el localStorage de user-complete
      localStorage.setItem('user-complete', JSON.stringify(this.usuario));

      //recargamos la pagina para que se vean los cambios
      window.location.reload();
    }).catch(error => {
      console.log(error);
    })
  }

}
