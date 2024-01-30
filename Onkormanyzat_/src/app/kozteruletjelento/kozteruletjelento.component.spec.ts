import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KozteruletjelentoComponent } from './kozteruletjelento.component';

describe('KozteruletjelentoComponent', () => {
  let component: KozteruletjelentoComponent;
  let fixture: ComponentFixture<KozteruletjelentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KozteruletjelentoComponent]
    });
    fixture = TestBed.createComponent(KozteruletjelentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
