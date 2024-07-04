import { Component } from '@angular/core';
import { PatientListComponent } from '../../../features/admin/components/patients/patient-list/patient-list.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [PatientListComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {

}
