import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  dismissModal(): void {
    this.modalController.dismiss();
  }

}
