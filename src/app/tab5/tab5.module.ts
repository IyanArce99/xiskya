import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab5PageRoutingModule } from './tab5-routing.module';

import { Tab5Page } from './tab5.page';
import { ModalMensajesRespuestaPage } from '../pages/modal-mensajes-respuesta/modal-mensajes-respuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab5PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [Tab5Page, ModalMensajesRespuestaPage],
  entryComponents: [ModalMensajesRespuestaPage]
})
export class Tab5PageModule {}
