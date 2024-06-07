import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { patientMenuItems } from '../../../../../core/constants/sidebarData';

@Component({
  selector: 'app-patient-sidebar',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './patient-sidebar.component.html',
  styleUrl: './patient-sidebar.component.scss',
})
export class PatientSidebarComponent {
  patientMenuItems = patientMenuItems;
}
