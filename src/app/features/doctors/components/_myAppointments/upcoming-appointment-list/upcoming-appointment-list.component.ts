import { ChangeDetectorRef, Component } from '@angular/core';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { DoctorAppointmentsService } from '../../../service/doctor-appointments.service';
import { EnumTranslationService } from '../../../../patient/services/enum-translation.service';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { PrescriptionFormComponent } from '../../prescription-form/prescription-form.component';
import { ReportFormComponent } from '../../report-form/report-form.component';
@Component({
  selector: 'app-upcoming-appointment-list',
  standalone: true,
  imports: [
    ReportFormComponent,
    PrescriptionFormComponent,
    TableComponent,
    PaginationComponent,
    CommonModule,
  ],
  templateUrl: './upcoming-appointment-list.component.html',
  styleUrl: './upcoming-appointment-list.component.scss',
})
export class UpcomingAppointmentListComponent {
  appointments: any[] = [];
  isReportModalOpen = false;
  isPrescriptionModalOpen = false;
  isCancelModalOpen = false;
  isCompleteModalOpen = false;
  displayedAppointments: any[] = [];
  selectedAppointmentId: any;
  currentPage: number = 1;
  pageSize: number = 8;
  totalItems: number = 0;

  headers: string[] = [
    'Hasta Adı',
    'Randevu Tarihi',
    'Randevu Durumu',
    'Aksiyonlar',
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private doctorAppointmentService: DoctorAppointmentsService,
    private enumTranslationService: EnumTranslationService,
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.doctorAppointmentService
      .getAllUpcomingAppointmentsByDoctor(this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.appointments = data.items;
        this.totalItems = data.totalCount; // Toplam öğe sayısını güncelleyin
        this.cdr.markForCheck();
      });
  }

  getTranslatedStatus(status: string): string {
    return this.enumTranslationService.translateAppointmentStatus(status);
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.loadAppointments();
  }

  openReportModal(appointmentId: string) {
    this.selectedAppointmentId = appointmentId;
    this.isReportModalOpen = true;
  }

  closeReportModal() {
    this.isReportModalOpen = false;
  }

  openPrescriptionModal(appointmentId: string) {
    this.selectedAppointmentId = appointmentId;
    this.isPrescriptionModalOpen = true;
  }

  closePrescriptionModal() {
    this.isPrescriptionModalOpen = false;
  }
  openCancelModal(appointmentId: string) {
    this.selectedAppointmentId = appointmentId;
    this.isCancelModalOpen = true;
  }

  closeCancelModal() {
    this.isCancelModalOpen = false;
  }

  openCompleteModal(appointmentId: string) {
    this.selectedAppointmentId = appointmentId;
    this.isCompleteModalOpen = true;
  }

  closeCompleteModal() {
    this.isCompleteModalOpen = false;
  }

  completeAppointment() {
    this.doctorAppointmentService
      .completeAppointment(this.selectedAppointmentId)
      .subscribe(() => {
        this.loadAppointments(); // Randevu listesini yeniden yükleyin
        this.closeCompleteModal();
      });
  }

  cancelAppointment() {
    this.doctorAppointmentService
      .cancelAppointment(this.selectedAppointmentId)
      .subscribe(() => {
        this.loadAppointments(); // Randevu listesini yeniden yükleyin
        this.closeCancelModal();
      });
  }
}
