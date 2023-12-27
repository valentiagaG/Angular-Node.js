import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AttractionsComponent } from './components/attractions/attractions.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent, ContactComponent, AboutComponent, HomeComponent, RouterModule, FooterComponent, AttractionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  title = 'routing';
  // private authService = inject (AuthService);

  // estaLogueado(){
  //   return this.authService.estaLogueado();
  // }

  // logOut(){
  //   this.authService.logOut();
  // }
}
