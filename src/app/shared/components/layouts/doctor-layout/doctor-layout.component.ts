import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { DoctorSidebarComponent } from './doctor-sidebar/doctor-sidebar.component';
@Component({
  selector: 'app-doctor-layout',
  standalone: true,
  imports: [HeaderComponent, DoctorSidebarComponent],
  templateUrl: './doctor-layout.component.html',
  styleUrl: './doctor-layout.component.scss',
})
export class DoctorLayoutComponent {}
