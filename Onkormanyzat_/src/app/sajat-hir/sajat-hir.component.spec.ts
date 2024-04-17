import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SajatHirComponent } from './sajat-hir.component';

describe('SajatHirComponent', () => {
  let component: SajatHirComponent;
  let fixture: ComponentFixture<SajatHirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SajatHirComponent]
    });
    fixture = TestBed.createComponent(SajatHirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
