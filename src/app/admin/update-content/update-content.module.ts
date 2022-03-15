import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateContentPageRoutingModule } from './update-content-routing.module';

import { UpdateContentPage } from './update-content.page';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateContentPageRoutingModule,
    ReactiveFormsModule,
    NgxSummernoteModule
  ],
  declarations: [UpdateContentPage]
})
export class UpdateContentPageModule {}
