import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabContentPageRoutingModule } from './tab-content-routing.module';

import { TabContentPage } from './tab-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabContentPageRoutingModule
  ],
  declarations: [TabContentPage]
})
export class TabContentPageModule {}
