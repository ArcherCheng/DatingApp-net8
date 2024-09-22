import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './_interceptor/error.interceptor';
import { jwtInterceptor } from './_interceptor/jwt.interceptor';
import { loadingInterceptor } from './_interceptor/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([errorInterceptor,jwtInterceptor,loadingInterceptor])),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'decreasing',
    }),
    importProvidersFrom(NgxSpinnerModule)
  ]
};
