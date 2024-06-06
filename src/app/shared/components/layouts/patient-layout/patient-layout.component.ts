import { Component } from '@angular/core';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import { PatientSidebarComponent } from './patient-sidebar/patient-sidebar.component';

@Component({
  selector: 'app-patient-layout',
  standalone: true,
  imports: [PatientHeaderComponent, PatientSidebarComponent],
  templateUrl: './patient-layout.component.html',
  styleUrl: './patient-layout.component.scss',
})
export class PatientLayoutComponent {}
