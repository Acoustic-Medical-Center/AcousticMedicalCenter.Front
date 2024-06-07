import { Component } from '@angular/core';
import { AppointmentTableComponent } from '../../../features/appointment/components/appointment-table/appointment-table.component';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [AppointmentTableComponent],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.scss',
})
export class MyAppointmentsComponent {}
