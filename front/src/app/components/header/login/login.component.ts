import { Component, inject } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';
import { AuthService } from '../../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SigninComponent, RouterModule, RouterOutlet, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public authService = inject (AuthService);
  userName = '';
  password = '';
  // public cookies = inject (CookieService);
  
  login(){
    // console.log(this.userName, this.password);
    this.authService.login(this.userName, this.password);
  }
}
