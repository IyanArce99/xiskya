import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalResetPageRoutingModule } from './modal-reset-routing.module';

import { ModalResetPage } from './modal-reset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalResetPageRoutingModule
  ],
  declarations: [ModalResetPage]
})
export class ModalResetPageModule {}
