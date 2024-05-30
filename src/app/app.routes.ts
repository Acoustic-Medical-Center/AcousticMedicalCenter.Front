import { Routes } from '@angular/router';
import { authRoutes } from './pages/_auth/auth.routes';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'HomePage' },
  ...authRoutes,
];
