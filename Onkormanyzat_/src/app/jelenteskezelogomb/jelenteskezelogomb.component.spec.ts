import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JelenteskezelogombComponent } from './jelenteskezelogomb.component';

describe('JelenteskezelogombComponent', () => {
  let component: JelenteskezelogombComponent;
  let fixture: ComponentFixture<JelenteskezelogombComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JelenteskezelogombComponent]
    });
    fixture = TestBed.createComponent(JelenteskezelogombComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
