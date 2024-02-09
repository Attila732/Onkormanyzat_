import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HibaComponent } from './hiba.component';

describe('HibaComponent', () => {
  let component: HibaComponent;
  let fixture: ComponentFixture<HibaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HibaComponent]
    });
    fixture = TestBed.createComponent(HibaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
