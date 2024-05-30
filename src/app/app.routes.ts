import { Routes } from '@angular/router';
import { authRoutes } from './pages/_auth/auth.routes';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SettingsComponent } from './pages/settings/settings/settings.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'HomePage' },
  { path: 'settings', component: SettingsComponent, title: 'Settings' },

  ...authRoutes,
];
