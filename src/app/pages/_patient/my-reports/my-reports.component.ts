import { Component } from '@angular/core';
import { ReportTableComponent } from '../../../features/patient/components/_myReports/report-table/report-table.component';

@Component({
  selector: 'app-my-reports',
  standalone: true,
  imports: [ReportTableComponent],
  templateUrl: './my-reports.component.html',
  styleUrl: './my-reports.component.scss',
})
export class MyReportsComponent {}
