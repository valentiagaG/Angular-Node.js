import { Component, inject } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
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
  
  
  login(){
    // console.log(this.userName, this.password);
    this.authService.login(this.userName, this.password);
  }
}
