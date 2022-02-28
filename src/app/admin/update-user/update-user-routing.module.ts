import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthUserGuard } from 'src/app/shared/auth-user.guard';

import { UpdateUserPage } from './update-user.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateUserPage,
    canActivate: [AuthUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateUserPageRoutingModule {}
