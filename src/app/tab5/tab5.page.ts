import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from '../modelos/User';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { MenuController, ModalController } from '@ionic/angular';
import { ModalMensajesRespuestaPage } from '../pages/modal-mensajes-respuesta/modal-mensajes-respuesta.page';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements AfterViewInit {
  usuario: User;
  editarLocationType: boolean = false;
  editarNumberCongressType: boolean = false;
  usuarioForm: FormGroup

  constructor(private fb: FormBuilder, private _dataService: DataService, private menu: MenuController, private modalController: ModalController) {
    this.usuarioForm = this.fb.group({
      location: '',
      numberCongress: ''
    })
  }

  ngAfterViewInit(): void {
    this.getUsuario();
  }

  ionViewDidEnter(){
    this.getUsuario();
  }

  getUsuario() {
    const datoUsuario = JSON.parse(localStorage.getItem('user-complete'));
    this.usuario = undefined;

    this._dataService.getUsuarioPorId(datoUsuario.id).subscribe(
      result => {
        console.log(result.data());
        this.usuario = result.data();

        this.usuarioForm.get("location").setValue(this.usuario.location);
        this.usuarioForm.get("numberCongress").setValue(this.usuario.numberCongress);
      }, error => {
        console.log(error);
      }
    )
  }

  cambiarEditLocation() {
    this.editarLocationType = !this.editarLocationType;
  }

  editLocation() {
    //limpiamos el localstorage del usuario completo
    localStorage.removeItem('user-complete');

    //guardamos en la variable usuario el nuevo cambio
    this.usuario.location = this.usuarioForm.get("location").value;

    //editamos el usuario en firebase
    this._dataService.editarUsuario(this.usuario.id, this.usuario).then(data => {
      //en caso de que edite correctamente volvemos a crear el localStorage de user-complete
      localStorage.setItem('user-complete', JSON.stringify(this.usuario));
      this.editarLocationType = false;
      this.editarNumberCongressType = false;
    }).catch(error => {
      console.log(error);
    })
  }

  cambiarEditNumberCongress() {
    this.editarNumberCongressType = !this.editarNumberCongressType;
  }

  editNumberCongress() {
    //limpiamos el localstorage del usuario completo
    localStorage.removeItem('user-complete');

    //guardamos en la variable usuario el nuevo cambio
    this.usuario.numberCongress = this.usuarioForm.get("numberCongress").value;

    //editamos el usuario en firebase
    this._dataService.editarUsuario(this.usuario.id, this.usuario).then(data => {
      //en caso de que edite correctamente volvemos a crear el localStorage de user-complete
      localStorage.setItem('user-complete', JSON.stringify(this.usuario));

      this.editarLocationType = false;
      this.editarNumberCongressType = false;
    }).catch(error => {
      console.log(error);
    })
  }

  //Menu lateral
  openEnd() {
    this.menu.open('end');
  }

  async responderMensajes(message: any) {
    const modal = await this.modalController.create({
      component: ModalMensajesRespuestaPage,
      cssClass: 'modalCustomizado',
      componentProps: {
        'mensaje': message,
      }
    });

    return await modal.present();
  }

}
