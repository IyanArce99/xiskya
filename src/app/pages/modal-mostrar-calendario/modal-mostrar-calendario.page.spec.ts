import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalMostrarCalendarioPage } from './modal-mostrar-calendario.page';

describe('ModalMostrarCalendarioPage', () => {
  let component: ModalMostrarCalendarioPage;
  let fixture: ComponentFixture<ModalMostrarCalendarioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMostrarCalendarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalMostrarCalendarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
