import {
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-report-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-report-details.component.html',
  styleUrl: './appointment-report-details.component.scss',
})
export class AppointmentReportDetailsComponent {
  @Input() reportId!: number | null;
  report: any;

  constructor(
    private patientService: PatientService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reportId'] && this.reportId !== null) {
      this.getReportDetails();
    }
  }

  getReportDetails() {
    this.patientService.getReportById(this.reportId).subscribe((data) => {
      this.report = data;
      this.cdr.markForCheck();
      console.log(this.report);
    });
  }
}
