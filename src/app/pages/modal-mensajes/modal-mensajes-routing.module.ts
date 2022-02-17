import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMensajesPage } from './modal-mensajes.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMensajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMensajesPageRoutingModule {}
