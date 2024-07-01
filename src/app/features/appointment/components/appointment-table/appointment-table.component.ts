import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentCardComponent } from '../../../../shared/components/appointment-card/appointment-card.component';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-table',
  standalone: true,
  imports: [CommonModule, AppointmentCardComponent],
  templateUrl: './appointment-table.component.html',
  styleUrl: './appointment-table.component.scss',
})
export class AppointmentTableComponent {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  loadAppointments() {
    this.appointmentService.getAllUpcomingAppointmentsByPatient().subscribe({
      next: (data) => this.handleUpdateResponse(data),
      error: (error) => this.handleError(error),
      complete: () => console.log('Observable completed'),
    });
  }

  handleUpdateResponse(data: any) {
    this.appointments = data;
    console.log('Appointments:', this.appointments);
  }

  handleError(error: any) {
    console.error('Error fetching appointments:', error);
  }

  ngOnInit() {
    this.loadAppointments();
  }
}
