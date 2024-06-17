import { Routes } from '@angular/router';
import { authRoutes } from './pages/_auth/auth.routes';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { patientRoutes } from './pages/_patient/patient.routes';
import  { doctorRoutes } from './pages/_doctor/doctor.routes';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'HomePage' },
  { path: 'dashboard', component: DashboardPageComponent, title: 'Dashboard' },
  { path: 'profile', component: ProfilePageComponent, title: 'Profile' },
  

  ...authRoutes,
  ...patientRoutes,
  ...doctorRoutes
  
];
