import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradeamentoAvaliadorPage } from './gradeamento-avaliador.page';

describe('GradeamentoAvaliadorPage', () => {
  let component: GradeamentoAvaliadorPage;
  let fixture: ComponentFixture<GradeamentoAvaliadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeamentoAvaliadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GradeamentoAvaliadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
