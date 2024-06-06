import { Component } from '@angular/core';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { adminMenuItems } from '../../../../../core/constants/sidebarData';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
  adminMenuItems = adminMenuItems;
}
