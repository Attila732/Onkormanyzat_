import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EladoTermekComponent } from './elado-termek.component';

describe('EladoTermekComponent', () => {
  let component: EladoTermekComponent;
  let fixture: ComponentFixture<EladoTermekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EladoTermekComponent]
    });
    fixture = TestBed.createComponent(EladoTermekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
