import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuVisitantePage } from './menu-visitante.page';

describe('MenuVisitantePage', () => {
  let component: MenuVisitantePage;
  let fixture: ComponentFixture<MenuVisitantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuVisitantePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuVisitantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
