import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RankingpopularPage } from './rankingpopular.page';

describe('RankingpopularPage', () => {
  let component: RankingpopularPage;
  let fixture: ComponentFixture<RankingpopularPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingpopularPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingpopularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
