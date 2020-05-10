import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectorPrincipalComponent } from './selector-principal.component';

describe('SelectorPrincipalComponent', () => {
  let component: SelectorPrincipalComponent;
  let fixture: ComponentFixture<SelectorPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorPrincipalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
