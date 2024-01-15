import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrvosNyitvatartasComponent } from './orvos-nyitvatartas.component';

describe('OrvosNyitvatartasComponent', () => {
  let component: OrvosNyitvatartasComponent;
  let fixture: ComponentFixture<OrvosNyitvatartasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrvosNyitvatartasComponent]
    });
    fixture = TestBed.createComponent(OrvosNyitvatartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
