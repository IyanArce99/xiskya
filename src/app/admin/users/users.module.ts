import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPage } from './users.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalResetPage } from '../../pages/modal-reset/modal-reset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [UsersPage, ModalResetPage],
  entryComponents: [ModalResetPage]
})
export class UsersPageModule {}
