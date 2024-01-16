import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

// Crea un mock para SnackbarComponent
@Component({ selector: 'app-snackbar', template: '' })
class MockSnackbarComponent {
  openSnackBar(message: string, action: string) {
    // Mock implementation
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      providers: [
        CookieService,
        { provide: SnackbarComponent, useClass: MockSnackbarComponent } // Provee el mock
      ]
    });
    service = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Agrega más pruebas para los métodos dentro de AuthService
});