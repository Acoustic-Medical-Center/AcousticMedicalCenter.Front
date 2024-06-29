import { Component } from '@angular/core';
import { DoctorAppointmentsListComponent } from '../../../features/doctors/components/doctor-appointments-list/doctor-appointments-list.component';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [DoctorAppointmentsListComponent],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.scss'
})
export class MyAppointmentsComponent {

}
