import { Component } from '@angular/core';
import { LiveSupportAdminComponent } from '../../../features/live-support/components/live-support-admin/live-support-admin.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LiveSupportAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
