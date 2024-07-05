import { Component } from '@angular/core';
import { AppointmentTableComponent } from '../../../features/appointment/components/appointment-table/appointment-table.component';
import { PastAppointmentsTableComponent } from '../../../features/patient/components/_myAppointments/past-appointments-table/past-appointments-table.component';
import { CommonModule } from '@angular/common';
import { UpcomingAppointmentsListComponent } from '../../../features/patient/components/_myAppointments/upcoming-appointments-list/upcoming-appointments-list.component';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [
    AppointmentTableComponent,
    PastAppointmentsTableComponent,
    UpcomingAppointmentsListComponent,
    CommonModule,
  ],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.scss',
})
export class MyAppointmentsComponent {
  selectedTab: string = 'upcoming';

  ngOnInit() {
    const savedTab = localStorage.getItem('selectedTab');
    if (savedTab) {
      this.selectedTab = savedTab;
    }
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
    localStorage.setItem('selectedTab', tab);
  }
}
