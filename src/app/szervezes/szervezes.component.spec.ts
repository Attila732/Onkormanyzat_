import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzervezesComponent } from './szervezes.component';

describe('SzervezesComponent', () => {
  let component: SzervezesComponent;
  let fixture: ComponentFixture<SzervezesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SzervezesComponent]
    });
    fixture = TestBed.createComponent(SzervezesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
