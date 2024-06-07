import { Component } from '@angular/core';
import { LogTableComponent } from '../../../features/logs/components/log-table/log-table.component';

@Component({
  selector: 'app-my-visits',
  standalone: true,
  imports: [LogTableComponent],
  templateUrl: './my-visits.component.html',
  styleUrl: './my-visits.component.scss',
})
export class MyVisitsComponent {}
