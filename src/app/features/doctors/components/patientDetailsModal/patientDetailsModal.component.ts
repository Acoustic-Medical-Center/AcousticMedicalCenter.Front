import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-patient-details-modal',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './patientDetailsModal.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDetailsModalComponent { }
