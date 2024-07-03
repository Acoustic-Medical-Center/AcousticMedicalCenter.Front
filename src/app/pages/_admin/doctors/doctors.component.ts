import { Component } from '@angular/core';
import { DoctorListComponent } from '../../../features/admin/components/doctors/doctor-list/doctor-list.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [DoctorListComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent {

}
