import { Routes } from '@angular/router';
import { MyDiseasesComponent } from './my-diseases/my-diseases.component';
import { MyPrescriptionsComponent } from './my-prescriptions/my-prescriptions.component';
import { MyRadiologyImagesComponent } from './my-radiology-images/my-radiology-images.component';
import { MyReportsComponent } from './my-reports/my-reports.component';
import { MyTestsComponent } from './my-tests/my-tests.component';
import { MyVisitsComponent } from './my-visits/my-visits.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';

export const patientRoutes: Routes = [
  {
    path: 'my-diseases',
    component: MyDiseasesComponent,
    title: 'Diseases',
  },
  {
    path: 'my-appointments',
    component: MyAppointmentsComponent,
    title: 'Appointments',
  },
  {
    path: 'createAppointment',
    component: CreateAppointmentComponent,
    title: 'Create Appointment',
  },
  {
    path: 'my-prescriptions',
    component: MyPrescriptionsComponent,
    title: 'Prescriptions',
  },
  {
    path: 'radiologyImages',
    component: MyRadiologyImagesComponent,
    title: 'Radiology Images',
  },
  {
    path: 'my-reports',
    component: MyReportsComponent,
    title: 'Reports',
  },
  {
    path: 'my-tests',
    component: MyTestsComponent,
    title: 'Tests',
  },
  {
    path: 'my-visits',
    component: MyVisitsComponent,
    title: 'Visits',
  },
];
