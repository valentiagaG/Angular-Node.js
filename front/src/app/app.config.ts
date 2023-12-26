import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './interceptors/error.interceptor';
import { CookieService } from 'ngx-cookie-service';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), HttpClientModule,provideHttpClient(withInterceptors([
    errorInterceptor
  ])), CookieService]

  
};
