import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { addHours, startOfDay } from 'date-fns';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events } from 'src/app/modelos/Event';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  @Input() dato;
  //variables
  start: string = "2021-02-18T08:08:00.006Z";
  end: string = "2021-02-19T09:00:00.556Z";
  eventSuccess: boolean = false;
  errorTexto:string = '';
  //formulario evento
  eventForm: FormGroup;
  //evento
  evento: Events;

  constructor(public modalController: ModalController, private fb: FormBuilder, private _dataService: DataService, private toastController: ToastController,
    private _errorService:ErrorService) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      dateStart: [this.start, Validators.required],
      dateEnd: [this.end, Validators.required]
    })
  }

  ngOnInit() {
    /*if (DataService.dateSelected) {
      this.start = DataService.dateSelected;
      this.end = DataService.dateSelected;
    }*/
    if(this.dato != undefined){
      this.eventForm.get("dateStart").setValue(this.dato.date.toString());
      this.eventForm.get("dateEnd").setValue(this.dato.date.toString());
    }
  }

  eventoCorrecto() {
    //El final del evento no puede ser antes del comienzo del evento
    //El evento dura como mucho un día
    //El evento no puede ser antes de la fecha actual de hoy

    const eventoComienzo = new Date(this.eventForm.get('dateStart').value);
    const eventoFinal = new Date(this.eventForm.get('dateEnd').value);
    const fechaActual = new Date();

    //comprobamos que el evento no es antes que la fecha actual
    if (fechaActual.getTime() <= eventoComienzo.getTime() && fechaActual.getTime() <= eventoFinal.getTime()) {
      //comprobamos que el comienzo del evento no es antes del final del evento
      if (eventoFinal.getTime() <= eventoComienzo.getTime()) {
        //final antes que comienzo
        //guardamos el error en una variable
        this.errorTexto = this._errorService.errorCalendar('eventEnd');
        //ponemos el evento como falso para que no se pueda crear
        this.eventSuccess = false;
        //console.log(this.errorTexto);
      } else {
        //comprobamos que el evento se realiza el mismo año
        if (eventoComienzo.getFullYear() == eventoFinal.getFullYear()) {
          if (eventoComienzo.getMonth() == eventoFinal.getMonth()) {
            if (eventoComienzo.getDay() == eventoFinal.getDay()) {
              this.eventSuccess = true;
              //console.log("evento correcto");
            } else {
              this.errorTexto = this._errorService.errorCalendar('eventDay');
              this.eventSuccess = false;
              //console.log("Los dias del evento son distintos");
            }
          } else {
            this.errorTexto = this._errorService.errorCalendar('eventMonth');
            this.eventSuccess = false;
            //console.log("Los meses del evento son distintos");
          }
        } else {
          this.errorTexto = this._errorService.errorCalendar('eventYear');
          this.eventSuccess = false;
          //console.log("Los años del evento son distintos");
        }
      }
    } else {
      this.errorTexto = this._errorService.errorCalendar('eventNow');
      this.eventSuccess = false;
      //console.log("Evento antes de la fecha actual");
    }
  }

  addEvent() {
    //const idBoton = document.querySelector('#botonEvento');
    

    if (this.eventSuccess == true) {
      const name = this.eventForm.get('name').value;
      const dateStart = new Date(this.eventForm.get('dateStart').value);
      const dateEnd = new Date(this.eventForm.get('dateEnd').value);

      this.evento = ({
        name: name,
        dateStart: dateStart,
        dateEnd: dateEnd
      })

      this._dataService.crearEvento(this.evento).then(data => {
        this.dismissModal();
      }).catch(error => {
        console.log(error);
      })
    }else{
      let toast = this.toastController.create({
        message: 'Evento incorrecto',
        duration: 1500,
        position: 'bottom',
        color: 'danger'
      }).then((data) => {
        data.present();
      })
    }
    /*let obj = {
      start: new Date(this.start),
      end: new Date(this.end),
      title: '',
      allDay: '',
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
    DataService.addEvent(obj);*/
  }

  dismissModal(): void {
    DataService.dateSelected = null;

    let toast = this.toastController.create({
      message: 'Evento agregado correctamente',
      duration: 1500,
      position: 'bottom',
      color: 'success'
    }).then((data) => {
      data.present();
    })

    this.modalController.dismiss();
  }

  dismissModalCancel():void{
    this.modalController.dismiss();
  }
}
