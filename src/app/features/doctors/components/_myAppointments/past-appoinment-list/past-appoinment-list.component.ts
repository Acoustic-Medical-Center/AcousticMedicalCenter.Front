import { ChangeDetectorRef, Component } from '@angular/core';
import { EnumTranslationService } from '../../../../patient/services/enum-translation.service';
import { CommonModule } from '@angular/common';
import { DoctorAppointmentsService } from '../../../service/doctor-appointments.service';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { ReportFormComponent } from '../../report-form/report-form.component';
import { PrescriptionFormComponent } from '../../prescription-form/prescription-form.component';
@Component({
  selector: 'app-past-appoinment-list',
  standalone: true,
  imports: [
    ReportFormComponent,
    TableComponent,
    PaginationComponent,
    CommonModule,
    PrescriptionFormComponent,
  ],
  templateUrl: './past-appoinment-list.component.html',
  styleUrl: './past-appoinment-list.component.scss',
})
export class PastAppoinmentListComponent {
  appointments: any[] = [];
  isReportModalOpen = false;
  isPrescriptionModalOpen = false;
  isCancelModalOpen = false;
  isCompleteModalOpen = false;
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
      .getAllPastAppointmentsByDoctor(this.currentPage, this.pageSize)
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
    console.log('this currentPage', this.currentPage);
    this.loadAppointments();
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
