import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { element } from 'protractor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/modelos/User';

@Component({
  selector: 'app-modal-mensajes-respuesta',
  templateUrl: './modal-mensajes-respuesta.page.html',
  styleUrls: ['./modal-mensajes-respuesta.page.scss'],
})
export class ModalMensajesRespuestaPage implements OnInit {
  @Input() mensaje:any;

  usuarioLogin:User;
  usuarios: Array<User> = [];
  mensajeForm: FormGroup;
  usuarioMensaje:User;

  constructor(private modalController:ModalController, private _dataService:DataService, private fb:FormBuilder, private toastCtrl: ToastController) {
    this.mensajeForm = this.fb.group ({
      id: '',
      imagePath : '',
      name: '',
      text: ['', Validators.required],
      fecha: ''
    })
  }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    //recogemos todos los usuarios y comprobamos a cual es al que enviaremos la respuesta
    this._dataService.getUsuarios().subscribe(
      data => {
        this.usuarios = [];
        data.forEach(element => {
          this.usuarios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });

        //comprobamos el id del mensaje con el id del usuario
        this.usuarios.forEach(element => {
          if(element.id == this.mensaje.id){
            this.usuarioMensaje = element;
          }
        });
      }, error => {
        console.log(error);
      }
    )
  }

  enviarRespuesta(){
    //guardamos el nombre de quien envia el mensaje
    this.usuarioLogin = JSON.parse(localStorage.getItem('user-complete'));

    //guardamos la fecha del momento exacto del mensaje
    const fecha:Date = new Date();

    //guardamos los datos del formulario
    this.mensajeForm.get('id').setValue(this.usuarioLogin.id);
    this.mensajeForm.get('imagePath').setValue(this.usuarioLogin.imagePath);
    this.mensajeForm.get('name').setValue(this.usuarioLogin.name);
    this.mensajeForm.get('fecha').setValue(fecha);

    //pusheamos el mensaje
    this.usuarioMensaje.messages.push(this.mensajeForm.value);

    //editamos el usuario con el nuevo mensaje
    this._dataService.editarUsuario(this.usuarioMensaje.id, this.usuarioMensaje).then(data=>{
      let toast = this.toastCtrl.create({
        message: 'Respuesta enviada correctamente',
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
