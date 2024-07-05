import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-report.component.html',
  styleUrls: ['./appointment-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentReportComponent implements OnChanges {
  @Input() appointmentId!: number | null;
  report: any;

  constructor(
    private patientService: PatientService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appointmentId'] && this.appointmentId !== null) {
      this.getReport();
      console.log('mahmut');
    }
  }

  getReport() {
    this.patientService
      .getReportByAppointmentId(this.appointmentId)
      .subscribe((data) => {
        this.report = data;
        this.cdr.markForCheck();
        console.log(this.report);
      });
  }
}
