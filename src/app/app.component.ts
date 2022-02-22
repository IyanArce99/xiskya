import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  usuario: any;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('user-complete')); 
  }

  logOut() {
    //nos deslogueamos
    this.afAuth.signOut();

    //una vez deslogueados limpiamos los localStorage
    localStorage.clear();

    //por ultimo recargamos la pagina
    window.location.reload();
  }
}
