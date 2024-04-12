import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SajatSzervezesekComponent } from './sajat-szervezesek.component';

describe('SajatSzervezesekComponent', () => {
  let component: SajatSzervezesekComponent;
  let fixture: ComponentFixture<SajatSzervezesekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SajatSzervezesekComponent]
    });
    fixture = TestBed.createComponent(SajatSzervezesekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
