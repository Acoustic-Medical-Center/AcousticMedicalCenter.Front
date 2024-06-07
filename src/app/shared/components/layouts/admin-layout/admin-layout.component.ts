import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { adminMenuItems } from '../../../../core/constants/sidebarData';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [HeaderComponent, AdminSidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {}
