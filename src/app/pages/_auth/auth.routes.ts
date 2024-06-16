import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { hasNoRole } from '../../core/guards/auth.guard';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canMatch: [hasNoRole],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canMatch: [hasNoRole],
  },
];
