import { ApplicationConfig, importProvidersFrom } from '@angular/core'

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './interceptors/error.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { provideRouter } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { HotelsService } from './services/hotels/hotels.service';
import { AttractionsService } from './services/attractionService/attractions.service';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), HttpClientModule,provideHttpClient(withInterceptors([
    errorInterceptor
  ])), CookieService, AuthService, HotelsService, AttractionsService]

  
};
