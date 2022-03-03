import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { addHours, startOfDay } from 'date-fns';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events } from 'src/app/modelos/Event';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  @Input() dato;
  //variables
  start: string = "2021-02-19T09:00:00.556Z";
  end: string = "2021-02-19T09:00:00.556Z";
  eventSuccess: boolean = true;
  errorTexto: string = '';
  //formulario evento
  eventForm: FormGroup;
  //evento
  evento: Events;

  constructor(public modalController: ModalController, private fb: FormBuilder, private _dataService: DataService, private toastController: ToastController,
    private _errorService: ErrorService) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      dateStart: [this.start, Validators.required],
      dateEnd: [this.end, Validators.required]
    })
  }

  ngOnInit() {
    if (this.dato) {
      this.eventForm.get("dateStart").setValue(this.dato.start.toISOString());
      this.eventForm.get("dateEnd").setValue(this.dato.end.toISOString());
      this.eventForm.get("name").setValue(this.dato.title);
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
      } else {
        //comprobamos que el evento se realiza el mismo año
        if (eventoComienzo.getFullYear() == eventoFinal.getFullYear()) {
          if (eventoComienzo.getMonth() == eventoFinal.getMonth()) {
            if (eventoComienzo.getDay() == eventoFinal.getDay()) {
              this.eventSuccess = true;
              //"evento correcto";
            } else {
              this.errorTexto = this._errorService.errorCalendar('eventDay');
              this.eventSuccess = false;
              //"Los dias del evento son distintos";
            }
          } else {
            this.errorTexto = this._errorService.errorCalendar('eventMonth');
            this.eventSuccess = false;
            //"Los meses del evento son distintos";
          }
        } else {
          this.errorTexto = this._errorService.errorCalendar('eventYear');
          this.eventSuccess = false;
          //"Los años del evento son distintos";
        }
      }
    } else {
      this.errorTexto = this._errorService.errorCalendar('eventNow');
      this.eventSuccess = false;
      //"Evento antes de la fecha actual";
    }
  }

  editEvent() {
    if (this.eventSuccess == true) {
      const name = this.eventForm.get('name').value;
      const dateStart = new Date(this.eventForm.get('dateStart').value);
      const dateEnd = new Date(this.eventForm.get('dateEnd').value);

      this.evento = ({
        name: name,
        dateStart: dateStart,
        dateEnd: dateEnd
      })

      this._dataService.editarEvento(this.dato.id, this.evento).then(data => {
        this.dismissModal();
      }).catch(error => {
        console.log(error);
      })
    } else {
      let toast = this.toastController.create({
        message: 'Evento incorrecto',
        duration: 1500,
        position: 'bottom',
        color: 'danger'
      }).then((data) => {
        data.present();
      })
    }
  }

  deleteEvent() {
    //procedemos a borrar el evento a partir del id
    this._dataService.borrarEvento(this.dato.id).then(result=>{
      let toast = this.toastController.create({
        message: 'Evento eliminado',
        duration: 1500,
        position: 'bottom',
        color: 'success'
      }).then((data) => {
        data.present();
      })

      this.dismissModalCancel();
    }).catch(error=>{
      console.log(error);
    })

  }

  dismissModal(): void {
    DataService.dateSelected = null;

    let toast = this.toastController.create({
      message: 'Evento editado correctamente',
      duration: 1500,
      position: 'bottom',
      color: 'success'
    }).then((data) => {
      data.present();
    })

    this.modalController.dismiss();
  }

  dismissModalCancel(): void {
    this.modalController.dismiss();
  }

}
