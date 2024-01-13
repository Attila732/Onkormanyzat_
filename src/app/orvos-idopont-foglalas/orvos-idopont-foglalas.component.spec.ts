import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrvosIdopontfoglalasComponent } from './orvos-idopont-foglalas.component';

describe('OrvosIdopontFoglalasComponent', () => {
  let component: OrvosIdopontfoglalasComponent;
  let fixture: ComponentFixture<OrvosIdopontfoglalasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrvosIdopontfoglalasComponent]
    });
    fixture = TestBed.createComponent(OrvosIdopontfoglalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
