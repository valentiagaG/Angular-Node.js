import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './interceptors/error.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { provideRouter } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { HotelsService } from './services/hotels/hotels.service';
import { AttractionsService } from './services/attractionService/attractions.service';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Validators } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { AgGridModule } from 'ag-grid-angular';
import { spinnerInterceptor } from './interceptors/spinner/spinner.interceptor';
import { NgxUiLoaderHttpModule, NgxUiLoaderRouterModule, NgxUiLoaderService } from 'ngx-ui-loader';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }, HttpClientModule, provideHttpClient(withInterceptors([
    errorInterceptor, spinnerInterceptor
  ])), SnackbarComponent, CookieService, AuthService, HotelsService, AttractionsService, provideAnimations(), MatTableDataSource, MatTableModule, MatTable, MatSortModule, SlickCarouselComponent, Validators, MatButton, AgGridModule, NgxUiLoaderRouterModule, NgxUiLoaderService, NgxUiLoaderHttpModule]


};
