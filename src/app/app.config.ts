import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './core/auth/interceptors/auth.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { loadingInterceptor } from './core/loading/loading.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([authInterceptor, loadingInterceptor]),
      withFetch(),
    ),
    provideAnimations(),
    provideToastr(
      {
        closeButton:true, 
        positionClass:'toast-top-right',
        timeOut: 10000,
        preventDuplicates:true
      }
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'tr',
        useDefaultLang: true,
        loader: {
          provide: TranslateLoader,
          useFactory: (httpClient: HttpClient) => {
            return new TranslateHttpLoader(
              httpClient,
              './assets/i18n/', // ön ek    ./assets/i18n/tr.json
              '.json', // son ek
            );
          },
          deps: [HttpClient], // dependencies
        },
      }),
    ),
  ],
};
