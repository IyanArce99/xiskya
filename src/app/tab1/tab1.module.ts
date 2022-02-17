import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ModalMensajesPage } from '../pages/modal-mensajes/modal-mensajes.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  declarations: [Tab1Page, ModalMensajesPage],
  entryComponents: [ModalMensajesPage]
})
export class Tab1PageModule {}
