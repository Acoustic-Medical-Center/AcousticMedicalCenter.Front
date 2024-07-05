import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DoctorAppointmentsService } from '../../service/doctor-appointments.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ReportFormComponent } from '../report-form/report-form.component';
import { PrescriptionFormComponent } from '../prescription-form/prescription-form.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-doctor-appointments-list',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ReportFormComponent,
    PrescriptionFormComponent,
    PaginationComponent,
  ],
  templateUrl: './doctor-appointments-list.component.html',
  styleUrls: ['./doctor-appointments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorAppointmentsListComponent implements OnInit {
  headers: string[] = [
    'Randevu Numarası',
    'Randevu Tarihi',
    'Hasta Adı',
    'Randevu Durumu',
    'Aksiyonlar',
  ];
  appointments: any[] = [];
  selectedAppointmentId: any;
  isReportModalOpen = false;
  isPrescriptionModalOpen = false;
  currentPage: number = 1;
  pageSize: number = 2;
  totalItems: number = 0;

  constructor(
    private appointmentsService: DoctorAppointmentsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentsService.getDoctorAppointments().subscribe((data) => {
      this.appointments = data;
      this.cdr.markForCheck(); // Change detection'i tetikliyor
      console.log(data);
    });
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

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    console.log('this currentPage', this.currentPage);
    this.loadAppointments();
  }
}
