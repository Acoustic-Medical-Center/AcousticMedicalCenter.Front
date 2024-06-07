import { Component } from '@angular/core';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { doctorMenuItems } from '../../../../../core/constants/sidebarData';

@Component({
  selector: 'app-doctor-sidebar',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './doctor-sidebar.component.html',
  styleUrl: './doctor-sidebar.component.scss',
})
export class DoctorSidebarComponent {
  doctorMenuItems = doctorMenuItems;
}
