import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-doctor-report-modal',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './doctor-report-modal.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorReportModalComponent { }
