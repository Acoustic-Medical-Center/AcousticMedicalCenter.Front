import { ChangeDetectorRef, Component } from '@angular/core';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { PatientService } from '../../../services/patient.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';
import { AppointmentReportDetailsComponent } from '../appointment-report-details/appointment-report-details.component';

@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [
    PaginationComponent,
    TableComponent,
    CommonModule,
    AppointmentReportDetailsComponent,
  ],
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.scss',
})
export class ReportTableComponent {
  reports: any[] = [];
  selectedReportId: number | null = null;
  currentPage: number = 1;
  pageSize: number = 8;
  totalItems: number = 0;

  headers: string[] = [
    'Rapor Numarası',
    'Doktor Adı',
    'Klinik Adı',
    'Oluşturulma Tarihi',
    'Teşhis',
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private patientService: PatientService,
  ) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.patientService.getAllReports().subscribe((data) => {
      this.reports = data.items;
      this.totalItems = data.totalCount; // Toplam öğe sayısını güncelleyin
      this.cdr.markForCheck();
    });
  }

  showDetails(reportId: number) {
    this.selectedReportId = reportId;
    const modal = document.getElementById('reportModal') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    console.log('this currentPage', this.currentPage);
    this.loadReports();
  }
}
