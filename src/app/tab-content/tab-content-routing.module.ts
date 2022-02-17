import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabContentPage } from './tab-content.page';

const routes: Routes = [
  {
    path: '',
    component: TabContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabContentPageRoutingModule {}
