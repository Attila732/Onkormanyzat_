import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FelhaszkezelesComponent } from './felhaszkezeles.component';

describe('FelhaszkezelesComponent', () => {
  let component: FelhaszkezelesComponent;
  let fixture: ComponentFixture<FelhaszkezelesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FelhaszkezelesComponent]
    });
    fixture = TestBed.createComponent(FelhaszkezelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
