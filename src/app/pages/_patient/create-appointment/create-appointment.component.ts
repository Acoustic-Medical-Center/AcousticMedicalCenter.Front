import { Component } from '@angular/core';
import { DoctorListComponent } from '../../../features/doctors/components/doctor-list/doctor-list.component';
import { BranchSelectionComponent } from '../../../features/appointment/components/branch-selection/branch-selection.component';
import { DoctorSelectionComponent } from '../../../features/appointment/components/doctor-selection/doctor-selection.component';
import { CreateAppointmentDropdownFormComponent } from '../../../features/appointment/components/create-appointment-dropdown-form/create-appointment-dropdown-form.component';
import { AppointmentService } from '../../../features/appointment/services/appointment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [
    CreateAppointmentDropdownFormComponent,
    DoctorListComponent,
    BranchSelectionComponent,
    DoctorSelectionComponent,
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

  // token = localStorage.getItem('token');

  // createAppointment() {
  //   const body = {
  //     doctorId: 2,
  //     dateTime: '2024-06-04T09:00:34.720Z',
  //   };

  //   const token = 'YOUR_AUTHORIZATION_TOKEN'; // Buraya gerçek yetkilendirme token'ınızı koyun

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   });

  //   this.http
  //     .post(
  //       'https://localhost:7172/api/Appointment/CreateAppointmentByPatient',
  //       body,
  //       { headers: headers },
  //     )
  //     .subscribe(
  //       (response) => {
  //         console.log('Appointment created:', response);
  //       },
  //       (error) => {
  //         console.error('Error:', error);
  //       },
  //     );
  // }
}
