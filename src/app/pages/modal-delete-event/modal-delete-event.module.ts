import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDeleteEventPageRoutingModule } from './modal-delete-event-routing.module';

import { ModalDeleteEventPage } from './modal-delete-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDeleteEventPageRoutingModule
  ],
  declarations: [ModalDeleteEventPage]
})
export class ModalDeleteEventPageModule {}
