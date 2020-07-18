import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocalizacaoPage } from './localizacao.page';

describe('LocalizacaoPage', () => {
  let component: LocalizacaoPage;
  let fixture: ComponentFixture<LocalizacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocalizacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
