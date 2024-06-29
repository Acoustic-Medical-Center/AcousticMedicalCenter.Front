import { Component } from '@angular/core';
// import { DoctorListComponent } from '../../../features/doctors/components/doctor-list/doctor-list.component';
import { BranchSelectionComponent } from '../../../features/appointment/components/branch-selection/branch-selection.component';
import { DoctorSelectionComponent } from '../../../features/appointment/components/doctor-selection/doctor-selection.component';
import { CreateAppointmentDropdownFormComponent } from '../../../features/appointment/components/create-appointment-dropdown-form/create-appointment-dropdown-form.component';
import { AppointmentService } from '../../../features/appointment/services/appointment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BranchListComponent } from '../../../features/branches/components/branch-list/branch-list.component';
import { AppointmentSliderComponent } from '../../../features/appointment/components/appointment-slider/appointment-slider.component';
import { BranchListComponent } from '../../../features/create-appointment/components/branch-list/branch-list.component';
import { DoctorListComponent } from '../../../features/create-appointment/components/doctor-list/doctor-list.component';
import { DateSliderComponent } from '../../../features/create-appointment/components/date-slider/date-slider.component';
import { DebugBoxComponent } from '../../../features/create-appointment/components/debug-box/debug-box.component';
import { TimeSlotsComponent } from '../../../features/create-appointment/components/time-slots/time-slots.component';
import { CreateAppointmentButtonComponent } from '../../../features/create-appointment/components/create-appointment-button/create-appointment-button.component';
import { AppointmentDateTimePickerComponent } from '../../../features/create-appointment/components/appointment-date-time-picker/appointment-date-time-picker.component';
@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [
    CreateAppointmentDropdownFormComponent,
    DoctorListComponent,
    BranchSelectionComponent,
    DoctorSelectionComponent,
    BranchListComponent,
    AppointmentSliderComponent,
    DateSliderComponent,
    DebugBoxComponent,
    TimeSlotsComponent,
    CreateAppointmentButtonComponent,
    AppointmentDateTimePickerComponent,
  ],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss',
})
export class CreateAppointmentComponent {
  constructor(
    private appointmentService: AppointmentService,
    private http: HttpClient,
  ) {}

  createAppointment() {
    const result = this.appointmentService.createAppointment();
    if (result) {
      result.subscribe((response) => {
        console.log('Appointment created', response);
      });
    } else {
      console.error('Doctor and date must be selected');
    }
  }
}
