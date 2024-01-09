import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AttractionsComponent } from './components/attractions/attractions.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ChartComponent } from './components/chart/chart.component';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent, ContactComponent, AboutComponent, HomeComponent, RouterModule, FooterComponent, AttractionsComponent, ReactiveFormsModule, SnackbarComponent, ChartComponent, NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  title = 'routing';


}
