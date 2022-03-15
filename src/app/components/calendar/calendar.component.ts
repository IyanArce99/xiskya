import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEventTimesChangedEvent, CalendarEvent, DAYS_OF_WEEK, CalendarEventTitleFormatter } from 'angular-calendar';
import { DataService } from 'src/app/services/data.service';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { ModalController } from '@ionic/angular';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';

interface Film {
  id: number;
  title: string;
  release_date: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {
  @Input() clickDate: any;
  indexTypeCalendar: number = 2;
  arrayTypesCalendar: string[] = ['week', 'day', 'month'];

  activeDayIsOpen: boolean = false;
  viewDate: Date = new Date();
  view: string = 'month';
  locale: string = 'es';
  isDragging: boolean = false;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  tipoFecha: string = 'mes';

  refresh: Subject<any> = new Subject();

  @Output() _addEvent: EventEmitter<any> = new EventEmitter();
  @Output() _editEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  //apertura de evento
  dayClicked({date,events,}: {date: Date; events: CalendarEvent<{ film: Film }>[];}): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  getEvents(): CalendarEvent[] {
    return DataService.events;
  }

  //editar evento
  editEvent(data): void {
    console.log(data);
    this._editEvent.emit(data.event);
  }

  openModalAddEvent(value): void {
    this._addEvent.emit(value);
  }

  nextType(): void {
    if (this.indexTypeCalendar === 2) {
      this.indexTypeCalendar = 0;
    } else {
      this.indexTypeCalendar += 1;
    }

    this.cambiarTipoFecha();
  }

  previousType(): void {
    if (this.indexTypeCalendar === 0) {
      this.indexTypeCalendar = 2;
    } else {
      this.indexTypeCalendar -= 1;
    }

    this.cambiarTipoFecha();
  }

  cambiarTipoFecha() {
    if (this.indexTypeCalendar === 0) {
      this.tipoFecha = 'semana';
    } else if (this.indexTypeCalendar === 1) {
      this.tipoFecha = 'dia';
    } else {
      this.tipoFecha = 'mes';
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
