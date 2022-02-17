import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from '../../modelos/User';
import { Message } from '../../modelos/Message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-modal-mensajes',
  templateUrl: './modal-mensajes.page.html',
  styleUrls: ['./modal-mensajes.page.scss'],
})
export class ModalMensajesPage implements OnInit {
  @Input() usuario:User;
  mensajeForm: FormGroup;
  usuarioLogin:User;

  constructor(private modalController:ModalController, private fb:FormBuilder, private _dataService:DataService, private toastCtrl: ToastController) {
    this.mensajeForm = this.fb.group ({
      imagePath : '',
      name: '',
      text: ['', Validators.required],
      fecha: ''
    })
   }

  ngOnInit() {
  }

  guardarMensaje(){
    //guardamos el nombre de quien envia el mensaje
    this.usuarioLogin = JSON.parse(localStorage.getItem('user-complete'));

    //guardamos la fecha del momento exacto del mensaje
    const fecha:Date = new Date();
    //pasamos los parametros al mensaje
    this.mensajeForm.get('imagePath').setValue(this.usuario.imagePath);
    this.mensajeForm.get('name').setValue(this.usuarioLogin.name);
    this.mensajeForm.get('fecha').setValue(fecha);

    //pusheamos el mensaje en el array de mensajes del usuario
    this.usuario.messages.push(this.mensajeForm.value);

    //editamos el usuario con el nuevo mensaje
    this._dataService.editarUsuario(this.usuario.id, this.usuario).then(data=>{
      let toast = this.toastCtrl.create({
        message: 'Mensaje enviado correctamente',
        duration: 3000,
        position: 'bottom',
        color: 'success'
      }).then((data) => {
        data.present();
      })

      this.cerrarModal();
    }).catch (error => {
      console.log(error);
    })
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

}
