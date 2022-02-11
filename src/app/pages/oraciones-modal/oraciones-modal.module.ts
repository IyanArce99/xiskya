import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OracionesModalPageRoutingModule } from './oraciones-modal-routing.module';

import { OracionesModalPage } from './oraciones-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OracionesModalPageRoutingModule
  ],
  declarations: [OracionesModalPage]
})
export class OracionesModalPageModule {}
