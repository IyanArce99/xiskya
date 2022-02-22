import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Events } from 'src/app/modelos/Event';
import { ModalDeleteEventPage } from '../../pages/modal-delete-event/modal-delete-event.page';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.page.html',
  styleUrls: ['./event-calendar.page.scss'],
})
export class EventCalendarPage implements OnInit {
  p=1;
  events:Events[] = [];

  constructor(private _dataService:DataService, private modalController:ModalController, toastController:ToastController) { }

  getEventos(){
    this._dataService.getEventos().subscribe(
      result=> {
        this.events = [];
        result.forEach(element => {
          this.events.push({
            id: element.payload.doc.id,
            name: element.payload.doc.data().name,
            dateStart: element.payload.doc.data().dateStart.toDate(),
            dateEnd: element.payload.doc.data().dateEnd.toDate()
          })
        });

        this.ordenarFechas();
      }, error=>{
        console.log(error);
      }
    )
  }

  ordenarFechas(){
    let fechaComienzo;
    let fechaFinal;
    for(let i = 0; i < this.events.length; i++){
      fechaComienzo = this.events[i].dateStart.toLocaleString();
      fechaFinal = this.events[i].dateEnd.toLocaleString();
      this.events[i].dateStart = fechaComienzo;
      this.events[i].dateEnd = fechaFinal;
    }
  }

  //modal delete event
  async openModal(nameEvent:any, id:any){
    const modal = await this.modalController.create({
      component: ModalDeleteEventPage,
      cssClass: 'modalCustomizado',
      componentProps: {
        'event': nameEvent,
        'id': id
      }
    });

    return await modal.present();
  }

  ngOnInit() {
    this.getEventos();
  }

}
