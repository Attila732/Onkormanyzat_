import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UthibajelentoComponent } from './uthibajelento.component';

describe('UthibajelentoComponent', () => {
  let component: UthibajelentoComponent;
  let fixture: ComponentFixture<UthibajelentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UthibajelentoComponent]
    });
    fixture = TestBed.createComponent(UthibajelentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
