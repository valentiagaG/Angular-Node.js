import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { HomeComponent } from '../home/home.component';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { AttractionsComponent } from '../attractions/attractions.component';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterOutlet,HeaderComponent, ContactComponent, AboutComponent, HomeComponent, RouterModule, LoginComponent, SigninComponent, AttractionsComponent, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService = inject (AuthService);

  estaLogueado(){
    return this.authService.estaLogueado();
  }

  logOut(){
    this.authService.logOut();
  }
}
