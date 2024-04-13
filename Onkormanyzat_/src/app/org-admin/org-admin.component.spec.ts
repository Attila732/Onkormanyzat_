import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminComponent } from './org-admin.component';

describe('OrgAdminComponent', () => {
  let component: OrgAdminComponent;
  let fixture: ComponentFixture<OrgAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgAdminComponent]
    });
    fixture = TestBed.createComponent(OrgAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
