import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrvosEgyebUgyekComponent } from './orvos-egyeb-ugyek.component';

describe('OrvosEgyebUgyekComponent', () => {
  let component: OrvosEgyebUgyekComponent;
  let fixture: ComponentFixture<OrvosEgyebUgyekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrvosEgyebUgyekComponent]
    });
    fixture = TestBed.createComponent(OrvosEgyebUgyekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
