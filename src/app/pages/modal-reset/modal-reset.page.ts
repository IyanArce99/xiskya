import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-reset',
  templateUrl: './modal-reset.page.html',
  styleUrls: ['./modal-reset.page.scss'],
})
export class ModalResetPage implements OnInit {
  @Input() email: string;

  constructor(private modalController:ModalController, private afAuth: AngularFireAuth, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  enviarPasswordReset(){
    //usamos el metodo para resetear la password
    this.afAuth.sendPasswordResetEmail(this.email).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Correo de recuperacion enviado correctamente',
        duration: 1500,
        position: 'bottom',
        color: 'success'
      }).then((data) => {
        data.present();
      })

      this.cerrarModal();
    }).catch(error => {
      console.log(error);
    });
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

}
