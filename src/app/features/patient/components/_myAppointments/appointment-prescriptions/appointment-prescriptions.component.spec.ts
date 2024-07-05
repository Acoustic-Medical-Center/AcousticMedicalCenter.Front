import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPrescriptionsComponent } from './appointment-prescriptions.component';

describe('AppointmentPrescriptionsComponent', () => {
  let component: AppointmentPrescriptionsComponent;
  let fixture: ComponentFixture<AppointmentPrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentPrescriptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
