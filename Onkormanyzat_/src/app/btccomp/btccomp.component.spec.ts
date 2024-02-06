import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BTCCompComponent } from './btccomp.component';

describe('BTCCompComponent', () => {
  let component: BTCCompComponent;
  let fixture: ComponentFixture<BTCCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BTCCompComponent]
    });
    fixture = TestBed.createComponent(BTCCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
