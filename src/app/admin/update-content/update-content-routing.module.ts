import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateContentPage } from './update-content.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateContentPageRoutingModule {}
