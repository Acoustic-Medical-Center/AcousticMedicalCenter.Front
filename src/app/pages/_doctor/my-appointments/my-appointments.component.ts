import { Component } from '@angular/core';
import { DoctorAppointmentsListComponent } from '../../../features/doctors/components/doctor-appointments-list/doctor-appointments-list.component';
import { CommonModule } from '@angular/common';
import { UpcomingAppointmentListComponent } from '../../../features/doctors/components/_myAppointments/upcoming-appointment-list/upcoming-appointment-list.component';
import { PastAppoinmentListComponent } from '../../../features/doctors/components/_myAppointments/past-appoinment-list/past-appoinment-list.component';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [
    DoctorAppointmentsListComponent,
    CommonModule,
    UpcomingAppointmentListComponent,
    PastAppoinmentListComponent,
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
