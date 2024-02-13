import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilSzerkesztesComponent } from './profil-szerkesztes.component';

describe('ProfilSzerkesztesComponent', () => {
  let component: ProfilSzerkesztesComponent;
  let fixture: ComponentFixture<ProfilSzerkesztesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilSzerkesztesComponent]
    });
    fixture = TestBed.createComponent(ProfilSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
