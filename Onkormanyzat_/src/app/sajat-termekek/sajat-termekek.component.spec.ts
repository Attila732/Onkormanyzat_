import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SajatTermekekComponent } from './sajat-termekek.component';

describe('SajatTermekekComponent', () => {
  let component: SajatTermekekComponent;
  let fixture: ComponentFixture<SajatTermekekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SajatTermekekComponent]
    });
    fixture = TestBed.createComponent(SajatTermekekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
