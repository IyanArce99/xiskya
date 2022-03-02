import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalMensajesRespuestaPage } from './modal-mensajes-respuesta.page';

describe('ModalMensajesRespuestaPage', () => {
  let component: ModalMensajesRespuestaPage;
  let fixture: ComponentFixture<ModalMensajesRespuestaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMensajesRespuestaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalMensajesRespuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
