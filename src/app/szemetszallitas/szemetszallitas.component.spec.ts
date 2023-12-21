import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzemetszallitasComponent } from './szemetszallitas.component';

describe('SzemetszallitasComponent', () => {
  let component: SzemetszallitasComponent;
  let fixture: ComponentFixture<SzemetszallitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SzemetszallitasComponent]
    });
    fixture = TestBed.createComponent(SzemetszallitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
