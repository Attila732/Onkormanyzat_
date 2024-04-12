import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SajatJelentesekComponent } from './sajat-jelentesek.component';

describe('SajatJelentesekComponent', () => {
  let component: SajatJelentesekComponent;
  let fixture: ComponentFixture<SajatJelentesekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SajatJelentesekComponent]
    });
    fixture = TestBed.createComponent(SajatJelentesekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
