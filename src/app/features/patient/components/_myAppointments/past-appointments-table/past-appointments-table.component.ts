import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient.service';
import { PastAppointmentDetailsComponent } from '../past-appointment-details/past-appointment-details.component';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';
import { EnumTranslationService } from '../../../services/enum-translation.service';

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
    private enumTranslationService: EnumTranslationService,
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.patientService
      .getAllPastAppointmentsByPatient(this.currentPage, this.pageSize)
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

  showDetails(appointmentId: number) {
    this.selectedAppointmentId = appointmentId;
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }
}
