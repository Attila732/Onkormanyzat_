import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekEladasComponent } from './termek-eladas.component';

describe('TermekEladasComponent', () => {
  let component: TermekEladasComponent;
  let fixture: ComponentFixture<TermekEladasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermekEladasComponent]
    });
    fixture = TestBed.createComponent(TermekEladasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
