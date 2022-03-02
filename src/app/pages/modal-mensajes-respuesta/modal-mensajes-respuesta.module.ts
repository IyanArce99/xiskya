import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMensajesRespuestaPageRoutingModule } from './modal-mensajes-respuesta-routing.module';

import { ModalMensajesRespuestaPage } from './modal-mensajes-respuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMensajesRespuestaPageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [ModalMensajesRespuestaPage]
})
export class ModalMensajesRespuestaPageModule {}
