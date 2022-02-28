import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  usuario: any;

  constructor(private afAuth: AngularFireAuth, private router: Router, private toastController: ToastController, private menuController:MenuController) { }

  ngOnInit(): void {
  }

  logOut() {
    //nos deslogueamos
    this.afAuth.signOut();

    //una vez deslogueados limpiamos los localStorage
    localStorage.clear();

    //por ultimo recargamos la pagina
    window.location.reload();
  }

  
  adminRouting() {
    //recogemos el usuario logueado actualmente
    this.usuario = JSON.parse(localStorage.getItem('user-complete'));

    //comprobamos si es admin
    if (this.usuario.range == 0) {
      //en caso de no serlo le lanzamos un aviso aclarando que no es administrador
      let toast = this.toastController.create({
        message: 'Se requieren permisos de administrador',
        duration: 1500,
        position: 'bottom',
        color: 'danger'
      }).then((data) => {
        data.present();
      })
    }else{
      //en caso de serlo viajamos al apartado admin y cerramos el menu
      this.menuController.close();
      this.router.navigate(['/admin']);
    }
  }
}
