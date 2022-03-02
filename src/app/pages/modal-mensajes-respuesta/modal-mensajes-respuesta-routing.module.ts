import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMensajesRespuestaPage } from './modal-mensajes-respuesta.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMensajesRespuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMensajesRespuestaPageRoutingModule {}
