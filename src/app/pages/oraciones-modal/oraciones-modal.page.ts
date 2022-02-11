import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { $ } from 'protractor';

@Component({
  selector: 'app-oraciones-modal',
  templateUrl: './oraciones-modal.page.html',
  styleUrls: ['./oraciones-modal.page.scss'],
})
export class OracionesModalPage implements OnInit {

  @Input() title: any;
  @Input() desc: any;
  constructor(public modalController: ModalController) { }

  ngOnInit() { 

  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
    
  }


  

}
