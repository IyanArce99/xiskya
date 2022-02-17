import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Content } from '../modelos/Content';

@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.page.html',
  styleUrls: ['./tab-content.page.scss'],
})
export class TabContentPage implements OnInit {
  contenido:Content;
  idContenido = '';

  constructor(private _route:ActivatedRoute, private _dataService:DataService) { }

  ngOnInit() {
    this.getContenido();
  }

  getContenido(){
    this.idContenido = this._route.snapshot.paramMap.get('id');

    this._dataService.getContenidoPorId(this.idContenido).subscribe(
      result=>{
        this.contenido = result.data();
    }, error=> {
      console.log(error);
    })
  }

}
