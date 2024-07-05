import {
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-prescription-detail',
  standalone: true,
  imports: [],
  templateUrl: './prescription-detail.component.html',
  styleUrl: './prescription-detail.component.scss',
})
export class PrescriptionDetailComponent {
  @Input() prescriptionId!: number | null;
  prescription: any;

  constructor(
    private patientService: PatientService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['prescriptionId'] && this.prescriptionId !== null) {
      this.getPrescriptionDetails();
    }
  }

  getPrescriptionDetails() {}

  // getReportDetails() {
  //   this.patientService.getReportById(this.reportId).subscribe((data) => {
  //     this.report = data;
  //     this.cdr.markForCheck();
  //     console.log(this.report);
  //   });
  // }
}
