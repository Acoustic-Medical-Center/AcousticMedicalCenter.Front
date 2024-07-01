import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { AppointmentCardComponent } from '../../../../shared/components/appointment-card/appointment-card.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upcoming-appointments-list',
  standalone: true,
  imports: [AppointmentCardComponent, CommonModule],
  templateUrl: './upcoming-appointments-list.component.html',
  styleUrl: './upcoming-appointments-list.component.scss',
})
export class UpcomingAppointmentsListComponent {
  appointments: any[] = [];

  constructor(
    private patientService: PatientService,
    private toastrService: ToastrService,
  ) {}

  onAppointmentCancel(appointmentId: number) {
    console.log(`Randevu iptal edilecek: ${appointmentId}`);
    this.patientService.cancelAppointmentById(appointmentId).subscribe({
      next: () => {
        this.toastrService.success('Randevu başarıyla iptal edildi.');
        this.updateAppointmentStatus(appointmentId, 'Canceled');
      },
      error: () => {
        this.toastrService.error('Randevu iptal edilirken bir hata oluştu.');
      },
    });
  }

  updateAppointmentStatus(appointmentId: number, status: string) {
    const appointment = this.appointments.find((a) => a.id === appointmentId);
    if (appointment) {
      appointment.status = status;
    }
  }

  loadAppointments() {
    this.patientService.getAllUpcomingAppointmentsByPatient().subscribe({
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
