import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzervezeskezdemenyComponent } from './szervezeskezdemeny.component';

describe('SzervezeskezdemenyComponent', () => {
  let component: SzervezeskezdemenyComponent;
  let fixture: ComponentFixture<SzervezeskezdemenyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SzervezeskezdemenyComponent]
    });
    fixture = TestBed.createComponent(SzervezeskezdemenyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
