import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/modelos/Login';
import { ErrorService } from 'src/app/services/error.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/modelos/User';
import { DataService } from '../../services/data.service';

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

  //comprobate usuario
  usuarios:Array<User>=[];
  usuario: User;

  constructor(private fb:FormBuilder, private _router:Router, private afAuth: AngularFireAuth, private _error:ErrorService, private _dataService:DataService) {
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
      
      this.getUsuarios();
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

  //recogemos todos los usuarios para comprobar quien se logueo
  getUsuarios(){
    this._dataService.getUsuarios().subscribe(
      result => {
        //limpiamos el array de usuarios
        this.usuarios=[];
        //realizamos un foreach y vamos pusheando todos los usuarios
        result.forEach(element => {
          this.usuarios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });

        //llamamos al metodo para comprobar cual es el usuario logueado y pasamos los usuarios
        this.guardarUsuarioCorrecto(this.usuarios);
      }, error =>{
        console.log(error);
      }
    )
  }

  guardarUsuarioCorrecto(users:Array<User>){
    //recogemos el correo que se guardo anteriormente en localStorage
    const datoUsuario = JSON.parse(localStorage.getItem('user'));

    //recorremos todos los correos y comprobamos que correos son iguales
    for(let i= 0; i<users.length; i++){
      if(datoUsuario.email == users[i].email ){
        //una vez encontremos ese correo realizamos un return para que concluya el metodo y guardamos todo el usuario en una variable del localStorage para poder usarlo
        localStorage.setItem('user-complete', JSON.stringify(users[i]));
        //nos movemos a otro componente
        return this._router.navigate(['/']);
      }
    }
  }

  ngOnInit() {
  }

}
