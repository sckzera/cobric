import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvaliarPage } from './avaliar.page';

describe('AvaliarPage', () => {
  let component: AvaliarPage;
  let fixture: ComponentFixture<AvaliarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvaliarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
