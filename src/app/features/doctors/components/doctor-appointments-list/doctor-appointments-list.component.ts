import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DoctorAppointmentsService } from '../../service/doctor-appointments.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ReportFormComponent } from '../report-form/report-form.component';
import { PrescriptionFormComponent } from '../prescription-form/prescription-form.component';

@Component({
  selector: 'app-doctor-appointments-list',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ReportFormComponent,
    PrescriptionFormComponent
  ],
  templateUrl: './doctor-appointments-list.component.html',
  styleUrl: './doctor-appointments-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorAppointmentsListComponent implements OnInit { 
  headers: string[] = [
    'Hasta Adı',
    'Randevu Durumu',
    'Randevu Tarihi',
  ];
  appointments: any[] = [];
  selectedAppointmentId: any;
  isReportModalOpen = false;
  isPrescriptionModalOpen = false;
  constructor(
    private appointmentsService: DoctorAppointmentsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.appointmentsService.getDoctorAppointments().subscribe(
      (data) => {
        this.appointments = data;
        this.cdr.markForCheck(); // Change detection'i tetikliyor
        console.log(data);
      }
    );
  }

  openReportModal(appointmentId: string) {
    this.selectedAppointmentId = appointmentId;
    this.isReportModalOpen = true;
  }

  closeReportModal() {
    this.isReportModalOpen = false;
    // Optionally clear selectedAppointmentId if needed
    // this.selectedAppointmentId = null;
  }

  openPrescriptionModal(appointmentId: string) {
    this.selectedAppointmentId = appointmentId;
    this.isPrescriptionModalOpen = true;
  }

  closePrescriptionModal() {
    this.isPrescriptionModalOpen = false;
    // Optionally clear selectedAppointmentId if needed
    // this.selectedAppointmentId = null;
  }
  
  
}
