import { Routes } from '@angular/router';
import { authRoutes } from './pages/_auth/auth.routes';
import { patientRoutes } from './pages/_patient/patient.routes';
import { adminRoutes } from './pages/_admin/admin.routes';
import { doctorRoutes } from './pages/_doctor/doctor.routes';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';

export const routes: Routes = [
  ...adminRoutes,
  ...authRoutes,
  ...patientRoutes,
  ...doctorRoutes,
  { path: 'contact', component: ContactPageComponent, title: 'Contact' },
  { path: 'faq', component: FaqPageComponent, title: 'Questions' },
  { path: '**', redirectTo: 'login' }, // Diğer rotalar için yönlendirme
];
