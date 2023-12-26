import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { NgIf } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, NgIf, LoginComponent, RouterModule, RouterOutlet],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  public authService = inject (AuthService);

  name: string = '';
  repass: string = '';
  password: string = '';
  userName: string = '';

  signin(){
    console.log(this.userName, this.password, this.repass);
    
    this.authService.signin(this.name, this.userName, this.password);
  }

}
