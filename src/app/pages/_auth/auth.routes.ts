import { ResolveFn, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { hasNoRole } from '../../core/guards/auth.guard';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
export const titleResolver = (path: string): ResolveFn<string> => {
  return async () => {
    const translateService = inject(TranslateService);
    const translatedTitle = await firstValueFrom(
      translateService.get(`authRoutes.${path}`),
    );

    // Dil değişikliklerini dinleyin ve başlığı güncelleyin
    translateService.onLangChange.subscribe(() => {
      translateService
        .get(`authRoutes.${path}`)
        .subscribe((newTranslatedTitle: string) => {
          console.log(`Yeni başlık: ${newTranslatedTitle}`);
          document.title = newTranslatedTitle;
        });
    });

    return translatedTitle;
  };
};

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    title: titleResolver('login'),
    canMatch: [hasNoRole],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    title: titleResolver('register'),
    canMatch: [hasNoRole],
  },
];
