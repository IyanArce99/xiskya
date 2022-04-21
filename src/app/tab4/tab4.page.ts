import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OracionesModalPage } from '../pages/oraciones-modal/oraciones-modal.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public modalController: ModalController, private router:Router) { }

  public frases = [
    {
      srcIcon: '../../assets/icon/Liturgia-de-las-horas.png',
      title: 'Liturgia de las horas',
      content: 'https://www.eltestigofiel.org/index.php?idu=lt_liturgia'
    },
    {
      srcIcon: '../../assets/icon/ofertorio.png',
      title: 'Ofrecimiento diario',
      content: 'Dios, Padre nuestro, Yo te ofrezco toda mi jornada, Mis oraciones, pensamientos, afectos y deseos, Palabras, obras, alegrías y sufrimientos, En unión con tu Hijo Jesucristo, Que sigue ofreciéndose a ti En la Eucaristía, por la salvación del mundo. Que el Espíritu Santo que guió a Jesús Sea mi guía y mi fuerza en este día, Para que pueda ser testigo de tu amor. Con María, la Madre del Señor y de la Iglesia, Te pido especialmente por las intenciones Del Papa y de nuestros Obispos para este mes.'
    },
    {
      srcIcon: '../../assets/icon/angelus.png',
      title: 'Angelus',
      content: 'V. El Ángel del Seńor anunció a María. R. Y concibió por obra del Espíritu Santo. Dios te salve, María... Santa María... V. He aquí la esclava del Seńor. R. Hágase en mí según tu palabra. Dios te salve, María... Santa María... V. Y el Verbo se hizo carne. R. Y habitó entre nosotros. Dios te salve, María... Santa María... V. Ruega por nosotros, santa Madre de Dios. R. Para que seamos dignos de alcanzar las promesas de Cristo. Oremos: Derrama, Seńor, tu gracia sobre nosotros, que, por el anuncio del Ángel, hemos conocido la encarnación de tu Hijo, para que lleguemos, por su pasión y su cruz, a la gloria de la resurrección. Por Jesucristo, nuestro Seńor. R. Amén.'
    },
    {
      srcIcon: '../../assets/icon/Regina_coeli.png',
      title: 'Regina coeli',
      content: 'Durante el tiempo pascual, en lugar del Ángelus, se dice el Regina coeli: V. Reina del cielo, alégrate. R. Aleluya. V. Porque el Señor, a quien mereciste llevar. R. Aleluya. V. Ha resucitado, como lo había dicho. R. Aleluya. V. Ruega al Señor por nosotros. R. Aleluya V. Goza y alégrate, Virgen María. Aleluya. R. Porque verdaderamente ha resucitado el Señor. Aleluya. Oremos: Oh Dios, que por la resurrección de tu Hijo, nuestro Señor Jesucristo, has llenado el mundo de alegría, concédenos, por intercesión de su Madre, la Virgen María, llegar a alcanzar los gozos eternos. Por el mismo Jesucristo, nuestro Señor. R. Amén.'
    },
    {
      srcIcon: '../../assets/icon/rosary.png',
      title: 'Rosario',
      content: 'Gozosos o de gozo: 1. El anuncio del ángel a la Virgen María 2. La visita de María a su prima Isabel 3. El nacimiento de Jesús 4. La presentación de Jesús en el Templo 5. Jesús perdido y hallado en el templo. Dolorosos: 1. La oración de Jesús en el huerto de Getsemaní 2. La flagelación de Jesús 3. La coronación de espinas 4. Jesús lleva la cruz a cuestas 5. Crucifixión y muerte de Jesús. Luminosos: 1. El bautismo de Jesús 2. La autorrevelación de Jesús en las bodas de Caná 3. El anuncio del Reino de Dios 4. La transfiguración de Jesús 5. La institución de la Eucaristía. Gloriosos: 1. La resurrección de Jesús 2. La ascensión de Jesús 3. La venida del Espíritu Santo 4. La asunción de María. 5. La coronación de la Virgen. Letanías luteranas: Señor, ten piedad Cristo, ten piedad Señor, ten piedad Cristo, óyenos Cristo, escúchanos Dios, Padre celestial Dios, Hijo Redentor del mundo Dios, Espíritu Santo Trinidad santa, un solo Dios Santa María Santa Madre de Dios Santa Virgen de las Vírgenes Madre de Cristo Madre de la Iglesia Madre de la Divina Gracia Madre purísima Madre castísima Madre y Virgen Madre sin mancha Madre inmaculada Madre amable Madre admirable Madre del buen consejo Madre del Creador Madre del Salvador Virgen prudentísima Virgen digna de veneración Virgen poderosa Virgen acogedora Virgen fiel Ideal de santidad Trono de sabiduría Causa de nuestra alegría Templo del Espíritu Santo Obra maestra de la gracia Modelo de entrega a Dios Rosa escogida Fuerte como la torre de David Hermosa como torre de marfil Casa de oro Arca de la Nueva Alianza Puerta del cielo Estrella de la mañana Salud de los enfermos Refugio de los pecadores Consoladora de los tristes Auxilio de los cristianos Reina de los Ángeles Reina de los Patriarcas Reina de los Profetas Reina de los Apóstoles Reina de los Mártires Reina de los confesores de la fe Reina de las Vírgenes Reina de todos los Santos Reina concebida sin pecado original Reina llevada al cielo Reina del Santo Rosario Reina de la Familia Reina de la paz Cordero de Dios que quitas el pecado del mundo, perdónanos, Señor. Cordero de Dios que quitas el pecado del mundo, escúchanos, Señor. Cordero de Dios que quitas el pecado del mundo, ten piedad de nosotros. Oración final: Te rogamos, Señor, que nos concedas a nosotros tus siervos, gozar de perpetua salud de alma y cuerpo y, por la gloriosa intercesión de la bienaventurada Virgen María, seamos librados de la tristeza presente y disfrutemos de la eterna alegría. Por Cristo nuestro Señor. Amén.'
    },
    {
      srcIcon: '../../assets/icon/Virgen-de-laPureza.png',
      title: 'Liturgia de la Pureza',
      content:  'https://www.xiskya.com/liturgia-pureza.html'
    },
  ];

  ngOnInit() {
  }

  async presentModal(oracion: any) {
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
