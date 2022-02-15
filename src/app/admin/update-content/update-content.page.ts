import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Content } from 'src/app/modelos/Content';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-content',
  templateUrl: './update-content.page.html',
  styleUrls: ['./update-content.page.scss'],
})
export class UpdateContentPage implements OnInit {
  //Variables
  contenidoForm: FormGroup;
  idUpdate:string;
  mostrarPdf:boolean = false;


  constructor(private _dataService: DataService, private fb: FormBuilder, private _router: ActivatedRoute) {
    this.contenidoForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      imagePath: '',
      pdfPath: '',
      content: ['', Validators.required],
      //tipo 0 circulo, 1 noticia, 2 revista
      type: [0, Validators.required],
    })
  }

  ngOnInit() {
    this.getContenidoPorId();
  }
  
  getContenidoPorId(){
    this.idUpdate = this._router.snapshot.paramMap.get('id');

    this._dataService.getContenidoPorId(this.idUpdate).subscribe(
      result => {
        this.contenidoForm.patchValue ({
          title: result.data().title,
          subtitle: result.data().subtitle,
          content: result.data().content,
          type: result.data().type,
          imagePath: result.data().imagePath,
          pdfPath: result.data().pdfPath
        })

        if(result.data().type == 2){
          this.mostrarPdf = true;
        }
      }, error => {
        console.log(error);
      }
    )
  }



}
