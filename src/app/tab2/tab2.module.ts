import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { AddEventComponent } from '../components/add-event/add-event.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ModalMostrarCalendarioPage } from '../pages/modal-mostrar-calendario/modal-mostrar-calendario.page';



registerLocaleData(localeEs);

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ReactiveFormsModule
  ],
  declarations: [Tab2Page, CalendarComponent, AddEventComponent, ModalMostrarCalendarioPage],
  entryComponents: [ModalMostrarCalendarioPage]

})
export class Tab2PageModule {}
