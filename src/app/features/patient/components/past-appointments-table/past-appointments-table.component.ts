import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { PastAppointmentDetailsComponent } from '../past-appointment-details/past-appointment-details.component';

@Component({
  selector: 'app-past-appointments-table',
  standalone: true,
  imports: [TableComponent, CommonModule, PastAppointmentDetailsComponent],
  templateUrl: './past-appointments-table.component.html',
  styleUrl: './past-appointments-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PastAppointmentsTableComponent {
  appointments: any[] = [];
  selectedAppointmentId: number | null = null;
  currentPage: number = 1;
  pageSize: number = 8;
  totalItems: number = 0;
  constructor(
    private cdr: ChangeDetectorRef,
    private patientService: PatientService,
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  headers: string[] = ['Doktor Adı', 'Randevu Tarihi', 'Randevu Durumu'];

  loadAppointments() {
    this.patientService
      .getAllPastAppointmentsByPatient(this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.appointments = data;
        this.cdr.markForCheck();
      });
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
