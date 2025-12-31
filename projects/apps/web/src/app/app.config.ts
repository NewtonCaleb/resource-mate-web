import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { API_CONFIG } from '@libs/api';
import { AuthInterceptor } from '@libs/auth';
import { environment } from '../environments/environment';

// Provides configurations for the application
/**
 * NOTE:
 * The object with "provide: API_CONFIG" is dependency injected.
 * On build it determines whether or not to use environment.ts or environment.development.ts and houses different values to be injected
 * "useValue" allows use to inject the env variable into API_CONFIG
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    {
      provide: API_CONFIG,
      useValue: {
        apiUrl: environment.apiUrl,
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
  ],
};
