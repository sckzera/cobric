import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradeamentoPage } from './gradeamento.page';

describe('GradeamentoPage', () => {
  let component: GradeamentoPage;
  let fixture: ComponentFixture<GradeamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeamentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GradeamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
