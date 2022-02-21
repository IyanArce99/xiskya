import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEventTimesChangedEvent, CalendarEvent } from 'angular-calendar';
import { ModalController } from '@ionic/angular';
import { AddEventComponent } from '../components/add-event/add-event.component';
import { Events } from '../modelos/Event';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  //eventosTotales
  eventosCalendario: Array<Events>;

  viewDate: Date = new Date();
  view: string = 'week';
  locale: string = 'pt';
  isDragging: boolean = false;

  refresh: Subject<any> = new Subject();

  /*events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 7),
      end: addHours(startOfDay(new Date()), 9),
      title: 'First Event',
      cssClass: 'custom-event',
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ]*/

  events: CalendarEvent[] = [];

  constructor(public modalController: ModalController, private _dataService: DataService) { }

  //mostrarEventos
  getEvents() {
    this._dataService.getEventos().subscribe(
      result => {
        this.eventosCalendario = [];
        result.forEach(element => {
          this.eventosCalendario.push({
            id: element.payload.doc.id,
            name: element.payload.doc.data().name,
            dateStart: element.payload.doc.data().dateStart.toDate(),
            dateEnd: element.payload.doc.data().dateEnd.toDate()
          })
        });
        this.agregarEventos();
      }, error => {
        console.log(error);
      }
    )
  }

  agregarEventos() {
    this.events = [];
    this.eventosCalendario.forEach(element => {
      const horasDiferencia = element.dateEnd.getHours() - element.dateStart.getHours();
      this.events.push({
        start: addHours(startOfDay(element.dateStart), element.dateStart.getHours()),
        end: addHours(element.dateEnd, horasDiferencia),
        title: element.name,
        cssClass: 'custom-event',
        color: {
          primary: '#488aff',
          secondary: '#bbd0f5'
        },
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
      })

      DataService.addEvent(this.events);
    })
  }

  //modal agregar eventos
  async presentModal(value) {
    console.log(value);
    const modal = await this.modalController.create({
      component: AddEventComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: {
        'dato': value
      }
    });
    return await modal.present();
  }

  ngOnInit(): void {
    this.getEvents();
  }
}

