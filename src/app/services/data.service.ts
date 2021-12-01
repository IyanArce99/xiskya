import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addHours, startOfDay } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  static events: CalendarEvent[] = [];
  static dateSelected: string;
  constructor() { }

  static addEvent(event: CalendarEvent) : void {
    this.events.push(event);
  }

  static getEvents(): CalendarEvent[] {
    return this.events;
  }
}
