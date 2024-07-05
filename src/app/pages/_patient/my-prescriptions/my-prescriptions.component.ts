import { Component } from '@angular/core';
import { PrescriptionTableComponent } from '../../../features/patient/components/_myPrescriptions/prescription-table/prescription-table.component';

@Component({
  selector: 'app-my-prescriptions',
  standalone: true,
  imports: [PrescriptionTableComponent],
  templateUrl: './my-prescriptions.component.html',
  styleUrl: './my-prescriptions.component.scss',
})
export class MyPrescriptionsComponent {}
