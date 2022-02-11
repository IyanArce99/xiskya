import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from '../modelos/User';
import { DataService } from '../services/data.service';
import { element } from 'protractor';
import { daysToWeeks } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements AfterViewInit{

  constructor(private _router:Router) {}

  ngAfterViewInit(): void {
    /*const datoUsuario = JSON.parse(localStorage.getItem('user-complete'));

    if(!datoUsuario){
      this._router.navigate(['/login']);
    }*/
    
  }

}
