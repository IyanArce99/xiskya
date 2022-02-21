import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMostrarCalendarioPage } from './modal-mostrar-calendario.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMostrarCalendarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMostrarCalendarioPageRoutingModule {}
