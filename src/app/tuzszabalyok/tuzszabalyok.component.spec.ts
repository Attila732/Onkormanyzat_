import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuzszabalyokComponent } from './tuzszabalyok.component';

describe('TuzszabalyokComponent', () => {
  let component: TuzszabalyokComponent;
  let fixture: ComponentFixture<TuzszabalyokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TuzszabalyokComponent]
    });
    fixture = TestBed.createComponent(TuzszabalyokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
