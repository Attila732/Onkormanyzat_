import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LomtalanitasComponent } from './lomtalanitas.component';

describe('LomtalanitasComponent', () => {
  let component: LomtalanitasComponent;
  let fixture: ComponentFixture<LomtalanitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LomtalanitasComponent]
    });
    fixture = TestBed.createComponent(LomtalanitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
