import { Component, OnInit } from '@angular/core';
import { User } from '../modelos/User';
import { DataService } from '../services/data.service';
import { element } from 'protractor';
import { daysToWeeks } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  usuarios:Array<User>=[];
  usuario:User;

  constructor(private _dataService:DataService, private _router:Router) {}

  ngOnInit(): void {
    const datoUsuario = JSON.parse(localStorage.getItem('user'));
    if(datoUsuario){
      this.getUsuarios();
    }else{
      this._router.navigate(['/login']);
    }
    
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
        return localStorage.setItem('user-complete', JSON.stringify(users[i]));
      }
    }
  }

}
