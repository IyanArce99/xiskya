import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OracionesModalPage } from '../pages/oraciones-modal/oraciones-modal.page';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public modalController: ModalController) { }

  public frases = [
    {
      title: 'Liturgia de las horas',
      content: 'aa'
    },
    {
      title: 'Ofrecimiento diario',
      content: 'Dios, Padre nuestro, Yo te ofrezco toda mi jornada, Mis oraciones, pensamientos, afectos y deseos, Palabras, obras, alegrías y sufrimientos, En unión con tu Hijo Jesucristo, Que sigue ofreciéndose a ti En la Eucaristía, por la salvación del mundo. Que el Espíritu Santo que guió a Jesús Sea mi guía y mi fuerza en este día, Para que pueda ser testigo de tu amor. Con María, la Madre del Señor y de la Iglesia, Te pido especialmente por las intenciones Del Papa y de nuestros Obispos para este mes.'
    },
    {
      title: 'Angelus',
      content: 'V. El Ángel del Seńor anunció a María. R. Y concibió por obra del Espíritu Santo. Dios te salve, María... Santa María... V. He aquí la esclava del Seńor. R. Hágase en mí según tu palabra. Dios te salve, María... Santa María... V. Y el Verbo se hizo carne. R. Y habitó entre nosotros. Dios te salve, María... Santa María... V. Ruega por nosotros, santa Madre de Dios. R. Para que seamos dignos de alcanzar las promesas de Cristo. Oremos: Derrama, Seńor, tu gracia sobre nosotros, que, por el anuncio del Ángel, hemos conocido la encarnación de tu Hijo, para que lleguemos, por su pasión y su cruz, a la gloria de la resurrección. Por Jesucristo, nuestro Seńor. R. Amén.'
    },
    {
      title: 'Regina coeli',
      content: ''
    },
    {
      title: 'Rosario',
      content: ''
    },
    {
      title: 'Liturgia de la Pureza',
      content: ''
    },
  ];

  ngOnInit() {
  }

  async presentModal(oracion: any) {
    console.log(oracion);
    const modal = await this.modalController.create({
      component: OracionesModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'title': oracion.title,
        'desc': oracion.content
      }
    });
    return await modal.present();
  }

}
