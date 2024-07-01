import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-patient-reports',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './patient-reports.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientReportsComponent { }
