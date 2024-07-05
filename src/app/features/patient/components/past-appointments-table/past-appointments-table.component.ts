import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { PastAppointmentDetailsComponent } from '../past-appointment-details/past-appointment-details.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-past-appointments-table',
  standalone: true,
  imports: [
    TableComponent,
    CommonModule,
    PastAppointmentDetailsComponent,
    PaginationComponent,
  ],
  templateUrl: './past-appointments-table.component.html',
  styleUrls: ['./past-appointments-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PastAppointmentsTableComponent implements OnInit {
  appointments: any[] = [];
  displayedAppointments: any[] = [];
  selectedAppointmentId: number | null = null;
  currentPage: number = 1;
  pageSize: number = 8;
  totalItems: number = 0;

  headers: string[] = ['Doktor Adı', 'Randevu Tarihi', 'Randevu Durumu'];

  constructor(
    private cdr: ChangeDetectorRef,
    private patientService: PatientService,
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.patientService
      .getAllPastAppointmentsByPatient(this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.appointments = data;
        this.totalItems = data.totalItems; // Toplam öğe sayısını güncelleyin
        this.updateDisplayedAppointments();
        this.cdr.markForCheck();
      });
  }

  updateDisplayedAppointments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedAppointments = this.appointments.slice(startIndex, endIndex);

    // Eğer gösterilecek öğe sayısı 8'den azsa boş satır ekle
    if (this.displayedAppointments.length < this.pageSize) {
      const emptyRows = Array(
        this.pageSize - this.displayedAppointments.length,
      ).fill({});
      this.displayedAppointments = [
        ...this.displayedAppointments,
        ...emptyRows,
      ];
    }
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.loadAppointments();
  }

  showDetails(appointmentId: number) {
    this.selectedAppointmentId = appointmentId;
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }
}
