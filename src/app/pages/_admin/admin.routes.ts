import { Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { isAdmin } from '../../core/guards/auth.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    canMatch: [isAdmin],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        title: 'Doctors',
      },
      {
        path: 'patients',
        component: PatientsComponent,
        title: 'Patients',
      },
      {
        path: 'appointments',
        component: AppointmentsComponent,
        title: 'Appointments',
      },
    ],
  },
];
