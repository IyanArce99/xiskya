import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDeleteEventPage } from './modal-delete-event.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDeleteEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDeleteEventPageRoutingModule {}
