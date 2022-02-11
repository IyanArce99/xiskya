import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/modelos/Login';
import { ErrorService } from 'src/app/services/error.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //Formulario login
  loginForm:FormGroup;
  errorTexto:string;
  errorComprobar:boolean = false;

  constructor(private fb:FormBuilder, private _router:Router, private afAuth: AngularFireAuth, private _error:ErrorService) {
    //inicialización formulario login
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  //metodo para iniciar sesion
  iniciarSesion(){
    //creamos dos variables, una por cada campo del formulario
    const usuario = this.loginForm.get("usuario").value;
    const password = this.loginForm.get("password").value;

    //usamos el metodo de acceder con email y contraseña
    this.afAuth.signInWithEmailAndPassword(usuario, password).then(result => {
      //guardamos en localstorage el usuario y su id
      this.setLocalStorage(result.user);
      //nos movemos a otro componente
      this._router.navigate(['/']);
    }).catch(error =>{
      //en caso de existir error comprobamos el codigo de este en un switch de un servicio el cual nos dice cual es el fallo concreto
      this.errorTexto = this._error.error(error.code);
      //mostramos el fallo
      this.errorComprobar = true;
      //al pasar 6 segundos ocultamos el fallo
      setTimeout(() => {
        this.errorComprobar = false;
      }, 6000);
    })
  }

  setLocalStorage(user:any){
    const usuario:Login = {
      id: user.uid,
      email: user.email
    };

    localStorage.setItem('user', JSON.stringify(usuario));
  }

  ngOnInit() {
  }

  login() {
    this._router.navigate(['/tabs/tab1']);
  }

}
