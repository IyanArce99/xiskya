import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Content } from '../modelos/Content';
import { AngularFireStorage, GetDownloadURLPipe } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.page.html',
  styleUrls: ['./tab-content.page.scss'],
})
export class TabContentPage implements OnInit {
  contenido: Content;
  idContenido = '';
  pdfUrl: Observable<string>;
  html;

  constructor(private _route: ActivatedRoute, private _dataService: DataService, private fs: AngularFireStorage, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getContenido();
  }

  getContenido() {
    this.idContenido = this._route.snapshot.paramMap.get('id');

    this._dataService.getContenidoPorId(this.idContenido).subscribe(
      result => {
        this.contenido = result.data();
        this.html = this.sanitizer.bypassSecurityTrustHtml(this.contenido.content) ;
      }, error => {
        console.log(error);
      })
  }

  descargarPdf() {
    const ref = this.fs.refFromURL(this.contenido.pdfPath);

    this.pdfUrl = ref.getDownloadURL();
  }

}
