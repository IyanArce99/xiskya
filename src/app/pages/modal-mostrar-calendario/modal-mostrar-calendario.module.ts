import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMostrarCalendarioPageRoutingModule } from './modal-mostrar-calendario-routing.module';

import { ModalMostrarCalendarioPage } from './modal-mostrar-calendario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMostrarCalendarioPageRoutingModule
  ],
  declarations: [ModalMostrarCalendarioPage]
})
export class ModalMostrarCalendarioPageModule {}
