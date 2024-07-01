import { Component } from '@angular/core';
import { DoctorsPatientsComponent } from '../../../features/doctors/components/doctors-patients/doctors-patients.component';

@Component({
  selector: 'app-my-patients',
  standalone: true,
  imports: [DoctorsPatientsComponent],
  templateUrl: './my-patients.component.html',
  styleUrl: './my-patients.component.scss'
})
export class MyPatientsComponent {

}
