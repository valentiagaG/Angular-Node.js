import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { SigninComponent } from "./signin.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Crea un mock para SnackbarComponent
class MockSnackbarComponent {
  openSnackBar(message: string, action: string) {
    // Mock implementation
  }
}

describe('LoginComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        SigninComponent
      ],
      providers: [
        { provide: SnackbarComponent, useClass: MockSnackbarComponent } // Provee el mock
      ]
    });
    
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});