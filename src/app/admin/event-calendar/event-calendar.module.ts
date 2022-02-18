import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventCalendarPageRoutingModule } from './event-calendar-routing.module';

import { EventCalendarPage } from './event-calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventCalendarPageRoutingModule
  ],
  declarations: [EventCalendarPage]
})
export class EventCalendarPageModule {}
