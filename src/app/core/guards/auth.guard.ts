import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';

export const authGuard: CanMatchFn = (route, segments) => {
  return true;
};

const createRoleGuard = (expectedRole: string): CanMatchFn => {
  return (route, segments) => {
    const authService = inject(AuthService);
    return authService.getUserType().pipe(
      tap((userType) => console.log('User Type:', userType)), // UserType'ı loglamak için tap kullanıyoruz
      map((userType) => userType === expectedRole),
    );
  };
};

export const hasNoRole: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  return authService.getUserType().pipe(
    tap((userType) => console.log('User Type:', userType)),
    map((userType) => !userType),
  );
};

export const isPatient = createRoleGuard('Patient');
export const isDoctor = createRoleGuard('Doctor');
export const isAdmin = createRoleGuard('Admin');
