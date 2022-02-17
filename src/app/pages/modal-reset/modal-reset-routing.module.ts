import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalResetPage } from './modal-reset.page';

const routes: Routes = [
  {
    path: '',
    component: ModalResetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalResetPageRoutingModule {}
