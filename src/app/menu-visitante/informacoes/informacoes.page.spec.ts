import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformacoesPage } from './informacoes.page';

describe('InformacoesPage', () => {
  let component: InformacoesPage;
  let fixture: ComponentFixture<InformacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacoesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
