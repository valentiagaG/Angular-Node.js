import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { AuthService } from './services/auth/auth.service';

// Crea un mock para SnackbarComponent
class MockSnackbarComponent {
  openSnackBar(message: string, action: string) {
    // Mock implementation
  }
}

describe('AppComponent', () => {
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule, // Provee un mock para el Router
        MatSnackBarModule, // Provee el servicio MatSnackBar
        HttpClientTestingModule // Provee un mock para HttpClient
      ],
      providers: [
        CookieService, // Provee el CookieService real o puedes usar un mock si es necesario
        { provide: AuthService, useClass: AuthService }, // Provee un mock para AuthService
        { provide: SnackbarComponent, useClass: MockSnackbarComponent } // Provee el mock para SnackbarComponent
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'routing' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    console.log(app.title);
    
    expect(app.title).toEqual('routing');
  });
});
