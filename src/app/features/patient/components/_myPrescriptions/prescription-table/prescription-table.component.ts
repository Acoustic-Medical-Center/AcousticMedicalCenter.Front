import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { PrescriptionDetailComponent } from '../prescription-detail/prescription-detail.component';

@Component({
  selector: 'app-prescription-table',
  standalone: true,
  imports: [
    PrescriptionDetailComponent,
    TableComponent,
    PaginationComponent,
    CommonModule,
  ],
  templateUrl: './prescription-table.component.html',
  styleUrls: ['./prescription-table.component.scss'],
})
export class PrescriptionTableComponent implements OnInit {
  prescriptions: any[] = [];
  selectedPrescriptionId: number | null = null;
  currentPage: number = 1;
  pageSize: number = 8;
  totalItems: number = 0;

  headers: string[] = [
    'Rapor Numarası',
    'Oluşturulma Tarihi',
    'Doktor Adı',
    'İlaç Adı',
    'Kullanım Şekli',
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private patientService: PatientService,
  ) {}

  ngOnInit() {
    this.loadPrescriptions();
  }

  loadPrescriptions() {
    this.patientService
      .getAllPrescriptions(this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.prescriptions = data.items;
        this.totalItems = data.totalCount; // Toplam öğe sayısını güncelleyin
        this.cdr.markForCheck();
      });
  }

  showDetails(prescriptionId: number) {
    this.selectedPrescriptionId = prescriptionId;
    const modal = document.getElementById(
      'prescriptionModal',
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    console.log('this currentPage', this.currentPage);
    this.loadPrescriptions();
  }
}
