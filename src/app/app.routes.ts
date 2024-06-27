import { Routes } from '@angular/router';
import { authRoutes } from './pages/_auth/auth.routes';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { patientRoutes } from './pages/_patient/patient.routes';
import { adminRoutes } from './pages/_admin/admin.routes';
import { doctorRoutes } from './pages/_doctor/doctor.routes';
import { ToastalertComponent } from './shared/components/toastr/toastalert/toastalert.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'HomePage' },

  // { path: 'settings', component: SettingsComponent, title: 'Settings' },
  // { path: 'profile', component: ProfilePageComponent, title: 'Profile' },
  ...adminRoutes,
  ...authRoutes,
  ...patientRoutes,
  ...doctorRoutes,
  { path: '**', redirectTo: 'login' }, // Diğer rotalar için yönlendirme
  {path: 'toast', component:ToastalertComponent}
];
