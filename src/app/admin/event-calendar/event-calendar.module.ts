import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventCalendarPageRoutingModule } from './event-calendar-routing.module';

import { EventCalendarPage } from './event-calendar.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalDeleteEventPage } from '../../pages/modal-delete-event/modal-delete-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventCalendarPageRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [EventCalendarPage, ModalDeleteEventPage],
  entryComponents: [ModalDeleteEventPage]
})
export class EventCalendarPageModule {}
