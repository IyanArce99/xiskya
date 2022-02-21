import { Component, OnInit, Output, EventEmitter, OnChanges, Input} from '@angular/core';
import { Subject } from 'rxjs';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEventTimesChangedEvent, CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { DataService } from 'src/app/services/data.service';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [CustomDateFormatter]
})
export class CalendarComponent implements OnInit {
  @Input() clickDate: any;
  indexTypeCalendar: number = 2;
  arrayTypesCalendar: string[] = ['day', 'week', 'month'];

  viewDate: Date = new Date();
  view: string = 'month';
  locale: string = 'es';
  isDragging: boolean = false;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  tipoFecha:string = 'mes';

  refresh: Subject<any> = new Subject();

  @Output() _addEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  //apertura de evento
  dayClicked(e){
    DataService.dateSelected = e.date.toISOString();
    this.openModalAddEvent(e);
  }

  getEvents(): CalendarEvent[] {
    return DataService.events;
  }
  
  test(data) : void {
    console.log("Click: ", data.event);
  }

  openModalAddEvent(value): void {
    this._addEvent.emit(value);
  }

  nextType(): void {
    if (this.indexTypeCalendar === 2) {
      this.indexTypeCalendar = 0;
    }else {
      this.indexTypeCalendar += 1;
    }

    this.cambiarTipoFecha();
  }

  previousType(): void {
    if (this.indexTypeCalendar === 0) {
      this.indexTypeCalendar = 2;
    }else {
      this.indexTypeCalendar -= 1;
    }

    this.cambiarTipoFecha();
  }

  cambiarTipoFecha(){
    if(this.indexTypeCalendar === 0){
      this.tipoFecha = 'dia';
    }else if(this.indexTypeCalendar === 1){
      this.tipoFecha = 'semana';
    }else{
      this.tipoFecha = 'mes';
    }
  }

  testardo(): void {
    console.log(this.clickDate);
  }
}
