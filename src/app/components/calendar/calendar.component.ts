import { Component, OnInit, Output, EventEmitter, OnChanges, Input} from '@angular/core';
import { Subject } from 'rxjs';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEventTimesChangedEvent, CalendarEvent } from 'angular-calendar';
import { DataService } from 'src/app/services/data.service';
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

  @Output() _addEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}
  @Input() clickDate: any;
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
  }

  previousType(): void {
    if (this.indexTypeCalendar === 0) {
      this.indexTypeCalendar = 2;
    }else {
      this.indexTypeCalendar -= 1;
    }
  }
  testardo(): void {
    console.log(this.clickDate);
  }
}
