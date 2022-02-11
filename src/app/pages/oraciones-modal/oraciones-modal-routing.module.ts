import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OracionesModalPage } from './oraciones-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OracionesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OracionesModalPageRoutingModule {}
