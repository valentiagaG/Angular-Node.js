import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ContactComponent } from '../../contact/contact.component';
import { AboutComponent } from '../../about/about.component';
import { HomeComponent } from '../../home/home.component';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { AttractionsComponent } from '../../attractions/attractions.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterOutlet,HeaderComponent, ContactComponent, AboutComponent, HomeComponent, RouterModule, LoginComponent, SigninComponent, AttractionsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
}
