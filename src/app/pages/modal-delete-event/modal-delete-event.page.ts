import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-delete-event',
  templateUrl: './modal-delete-event.page.html',
  styleUrls: ['./modal-delete-event.page.scss'],
})
export class ModalDeleteEventPage implements OnInit {
  @Input() event:string;
  @Input() id:string;

  constructor(private modalController:ModalController, private toastCtrl: ToastController, private _dataService:DataService) { }

  cerrarModal(){
    this.modalController.dismiss();
  }

  borrarEvento(){
    this._dataService.borrarEvento(this.id).then(result=>{
      let toast = this.toastCtrl.create({
        message: 'Evento borrado correctamente',
        duration: 1500,
        position: 'bottom',
        color: 'success'
      }).then((data) => {
        data.present();
      })

      this.cerrarModal();
    }).catch(error=>{
      console.log(error);
    })
  }

  ngOnInit() {
  }

}
