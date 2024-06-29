import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDateTimePickerComponent } from './appointment-date-time-picker.component';

describe('AppointmentDateTimePickerComponent', () => {
  let component: AppointmentDateTimePickerComponent;
  let fixture: ComponentFixture<AppointmentDateTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentDateTimePickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
