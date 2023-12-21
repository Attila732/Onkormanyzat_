import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizGazComponent } from './viz-gaz.component';

describe('VizGazComponent', () => {
  let component: VizGazComponent;
  let fixture: ComponentFixture<VizGazComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VizGazComponent]
    });
    fixture = TestBed.createComponent(VizGazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
