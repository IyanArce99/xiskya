import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
//modulos y servicios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  //formulario recuperar contraseña
  recuperarForm: FormGroup;
  //texto de error
  errorTexto:string;
  //booleano para comprobar si hay un error
  errorComprobar:boolean = false;

  constructor(private fb:FormBuilder, private _router:Router, private afAuth: AngularFireAuth, private _error:ErrorService, private toastCtrl: ToastController) {
    this.recuperarForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    })
  }

  recuperarPassword(){
    //guardamos el correo en una variable
    const correo = this.recuperarForm.get("correo").value;

    //usamos el metodo para resetear la password
    this.afAuth.sendPasswordResetEmail(correo).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Correo enviado',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      }).then((data) => {
        data.present();
      })
      //volvemos al login
      this._router.navigate(['/login']);
    }).catch(error => {
      //guardamos el texto del error en la variable errorTexto
      this.errorTexto = this._error.error(error.code);
      //pasamos a true el fallo para enseñarlo
      this.errorComprobar = true;
      //al pasar 6 segundos ocultamos el fallo
      setTimeout(() => {
        this.errorComprobar = false;
      }, 6000);
    });
  }

  ngOnInit() {
  }

}
