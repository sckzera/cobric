import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuAvaliadorPage } from './menu-avaliador.page';

describe('MenuAvaliadorPage', () => {
  let component: MenuAvaliadorPage;
  let fixture: ComponentFixture<MenuAvaliadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAvaliadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuAvaliadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
