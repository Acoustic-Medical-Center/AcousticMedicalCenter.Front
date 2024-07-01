import { Component, Input } from '@angular/core';
import { AppointmentReportComponent } from '../appointment-report/appointment-report.component';
import { AppointmentPrescriptionsComponent } from '../appointment-prescriptions/appointment-prescriptions.component';

@Component({
  selector: 'app-past-appointment-details',
  standalone: true,
  imports: [AppointmentReportComponent, AppointmentPrescriptionsComponent],
  templateUrl: './past-appointment-details.component.html',
  styleUrl: './past-appointment-details.component.scss',
})
export class PastAppointmentDetailsComponent {
  @Input() appointmentId: number | null = null;
}
