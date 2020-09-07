import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VotarPage } from './votar.page';

describe('VotarPage', () => {
  let component: VotarPage;
  let fixture: ComponentFixture<VotarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VotarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
