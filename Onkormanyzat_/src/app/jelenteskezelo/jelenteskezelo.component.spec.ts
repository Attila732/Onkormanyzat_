import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JelenteskezeloComponent } from './jelenteskezelo.component';

describe('JelenteskezeloComponent', () => {
  let component: JelenteskezeloComponent;
  let fixture: ComponentFixture<JelenteskezeloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JelenteskezeloComponent]
    });
    fixture = TestBed.createComponent(JelenteskezeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
