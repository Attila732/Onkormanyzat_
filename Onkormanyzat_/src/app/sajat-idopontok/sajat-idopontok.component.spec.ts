import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SajatIdopontokComponent } from './sajat-idopontok.component';

describe('SajatIdopontokComponent', () => {
  let component: SajatIdopontokComponent;
  let fixture: ComponentFixture<SajatIdopontokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SajatIdopontokComponent]
    });
    fixture = TestBed.createComponent(SajatIdopontokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
