import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEventTimesChangedEvent, CalendarEvent } from 'angular-calendar';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  indexTypeCalendar: number = 0;
  arrayTypesCalendar: string[] = ['day', 'week', 'month'];

  viewDate: Date = new Date();
  view: string = 'week';
  locale: string = 'es';
  isDragging: boolean = false;

  refresh: Subject<any> = new Subject();

  @Output() _addEvent: EventEmitter<void> = new EventEmitter();

  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 7),
      end: addHours(startOfDay(new Date()), 9),
      allDay: true,
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
    },
    {
      start: addHours(startOfDay(new Date()), 10),
      end: addHours(startOfDay(new Date()), 12),
      title: 'Second Event',
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
  ]

  constructor() { }

  ngOnInit() {}

  test(data) : void {
    console.log("Click: ", data.event);
  }

  openModalAddEvent(): void {
    this._addEvent.emit();
  }

  nextType(): void {
    if (this.indexTypeCalendar === 2) {
      this.indexTypeCalendar = 0;
    }else {
      this.indexTypeCalendar += 1;
    }
  }

  previousType(): void {
    if (this.indexTypeCalendar === 0) {
      this.indexTypeCalendar = 2;
    }else {
      this.indexTypeCalendar -= 1;
    }
  }

}
