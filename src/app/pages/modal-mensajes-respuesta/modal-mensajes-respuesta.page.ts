import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { DataService } from '../../services/data.service';
import { element } from 'protractor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private modalController:ModalController, private _dataService:DataService, private fb:FormBuilder) {
    this.mensajeForm = this.fb.group ({
      imagePath : '',
      name: '',
      text: ['', Validators.required],
      fecha: ''
    })
  }

  ngOnInit() {
    this.recogerUsuario();
  }

  recogerUsuario(){
    //recogemos el usuario logueado actualmente
    this.usuarioLogin = JSON.parse(localStorage.getItem('user-complete'));

    //recorremos los distintos usuarios existentes hasta encontrar al usuario al que vamos a enviar el mensaje
    this._dataService.getUsuarios().subscribe(
      data => {
        this.usuarios = [];
        data.forEach(element => {
          this.usuarios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });

        this.usuarios.forEach(element=>{
          console.log(element);
        })
        
      }, error => {
        console.log(error);
      }
    )
  }

  enviarRespuesta(){
    //pusheamos el mensaje al usuario en cuestión
    
  }

  cerrarModal(){
    this.modalController.dismiss();
  }
}
