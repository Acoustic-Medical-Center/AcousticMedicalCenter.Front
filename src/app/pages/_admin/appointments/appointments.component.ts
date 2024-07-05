import { Component } from '@angular/core';
import { AppointmentListComponent } from '../../../features/admin/components/appointments/appointment-list/appointment-list.component';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [AppointmentListComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent {

}
