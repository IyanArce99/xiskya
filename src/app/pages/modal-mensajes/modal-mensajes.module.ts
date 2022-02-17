import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMensajesPageRoutingModule } from './modal-mensajes-routing.module';

import { ModalMensajesPage } from './modal-mensajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMensajesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalMensajesPage]
})
export class ModalMensajesPageModule {}
