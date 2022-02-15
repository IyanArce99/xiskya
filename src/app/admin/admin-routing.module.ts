import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'content',
        loadChildren: () => import('./content/content.module').then( m => m.ContentPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: 'update-content/:id',
        loadChildren: () => import('./update-content/update-content.module').then( m => m.UpdateContentPageModule)
      },
      {
        path: 'update-user/:id',
        loadChildren: () => import('./update-user/update-user.module').then( m => m.UpdateUserPageModule)
      },
      {
        path: '',
        redirectTo: '/admin/content',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/admin/content',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
