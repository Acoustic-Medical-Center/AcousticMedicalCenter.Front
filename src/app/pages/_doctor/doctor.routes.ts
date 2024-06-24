import { Routes } from '@angular/router';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { MyPatientsComponent } from './my-patients/my-patients.component';
import { isDoctor } from '../../core/guards/auth.guard';
import { DoctorSettingsComponent } from './doctor-settings/doctor-settings.component';

export const doctorRoutes: Routes = [
  {
    path: '',
    canMatch: [isDoctor],
    children: [
      {
        path: 'my-appointments',
        component: MyAppointmentsComponent,
        title: 'Appointments',
      },
      {
        path: 'my-calendar',
        component: MyCalendarComponent,
        title: 'Calendar',
      },
      {
        path: 'my-patients',
        component: MyPatientsComponent,
        title: 'Patients',
      },
      {
        path: 'settings',
        component: DoctorSettingsComponent,
        title: 'Settings',
      },
    ],
  },
];
