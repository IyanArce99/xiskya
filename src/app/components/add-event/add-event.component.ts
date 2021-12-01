import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { addHours, startOfDay } from 'date-fns';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  title: string;
  start: string = "2021-12-01T22:48:33.556Z";
  end: string = "2021-12-01T22:48:33.556Z";

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    if (DataService.dateSelected) {
      this.start = DataService.dateSelected;
      this.end = DataService.dateSelected;
    }
  }

  dismissModal(): void {
    DataService.dateSelected = null;
    this.modalController.dismiss();
  }
test(){
  console.log(this.title);
  console.log(this.start);
  console.log(this.end)
  let obj = {
    start: new Date(this.start),
    end: new Date(this.end),
    title: this.title,
    cssClass: 'custom-event',
    color: {
      primary: '#488aff',
      secondary: '#bbd0f5'
    },
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  }
  DataService.addEvent(obj);

  this.dismissModal();
  }
}
