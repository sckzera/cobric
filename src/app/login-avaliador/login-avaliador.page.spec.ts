import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginAvaliadorPage } from './login-avaliador.page';

describe('LoginAvaliadorPage', () => {
  let component: LoginAvaliadorPage;
  let fixture: ComponentFixture<LoginAvaliadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAvaliadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginAvaliadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
