import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/modelos/User';
import { DataService } from '../../services/data.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit, OnDestroy {
  subscriptionUser: Subscription = new Subscription();
  selector: number = 0;
  agregarUsuariosForm: FormGroup;
  usuarios:Array<User> = [];
  usuario:User;

  constructor(private fb: FormBuilder, private _dataService: DataService, private afAuth: AngularFireAuth) {
    this.agregarUsuariosForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      numberCongress: [0, Validators.required],
      location: ['', Validators.required],
      birthday: ['', Validators.required],
      imagePath: [''],
      range: [0, Validators.required]
    })
  }

  ngOnInit() {
    this.getUsuarios();
  }

  ngOnDestroy(): void {
      this.subscriptionUser.unsubscribe();
  }

  seleccionarApartado(valor: number) {
    this.selector = valor;
  }

  agregarUsuario() {
    //guardamos los datos del formulario en un objeto de tipo user
    const email = this.agregarUsuariosForm.get("email").value;
    const name = this.agregarUsuariosForm.get("name").value;
    const surname = this.agregarUsuariosForm.get("surname").value;
    const numberCongress = this.agregarUsuariosForm.get("numberCongress").value;
    const location = this.agregarUsuariosForm.get("location").value;
    const birthday = this.agregarUsuariosForm.get("birthday").value;
    const imagePath = this.agregarUsuariosForm.get("imagePath").value;
    const range = this.agregarUsuariosForm.get("range").value;
    const password = this.agregarUsuariosForm.get("password").value;

    this.usuario = {
      email: email,
      name: name,
      surname: surname,
      numberCongress: numberCongress,
      location: location,
      birthday: birthday,
      imagePath: imagePath,
      range: range
    }


    this._dataService.crearUsuario(this.usuario).then(data => {
      this.agregarUsuariosForm.patchValue({
        email: '',
        password: '',
        name: '',
        surname: '',
        numberCongress: '',
        location: '',
        birthday: '',
        imagePath: '',
        range: 0
      })
      this.registrarUsuario(email, password);
    }).catch(error => {
      console.log(error);
    })
  }

  registrarUsuario(email:string, password:string){
    this.afAuth.createUserWithEmailAndPassword(email, password).then(result => {
      console.log("registrado correctamente");
    }).catch(error => {
      console.log(error);
    })

  }

  getUsuarios(){
    this.subscriptionUser = this._dataService.getUsuarios().subscribe(
      data => {
        this.usuarios = [];
        data.forEach(element => {
          this.usuarios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
      }, error => {
        console.log(error);
      }
    )
  }

  borrarUsuario(codigo:string){
    this._dataService.borrarUsuario(codigo).then(data => {
    }).catch(error =>{
      console.log("entra");
    })
  }

}
