import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Content } from '../modelos/Content';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.page.html',
  styleUrls: ['./tab-content.page.scss'],
})
export class TabContentPage implements OnInit {
  contenido:Content;
  idContenido = '';

  constructor(private _route:ActivatedRoute, private _dataService:DataService, private fs:AngularFireStorage) { }

  ngOnInit() {
    this.getContenido();
  }

  getContenido(){
    this.idContenido = this._route.snapshot.paramMap.get('id');

    this._dataService.getContenidoPorId(this.idContenido).subscribe(
      result=>{
        this.contenido = result.data();

        console.log(this.contenido.pdfPath);
    }, error=> {
      console.log(error);
    })
  }

}
