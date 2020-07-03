import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginVisitantePage } from './login-visitante.page';

describe('LoginVisitantePage', () => {
  let component: LoginVisitantePage;
  let fixture: ComponentFixture<LoginVisitantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginVisitantePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginVisitantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
