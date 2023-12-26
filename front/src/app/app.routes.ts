import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { SigninComponent } from './components/header/signin/signin.component';
import { LoginComponent } from './components/header/login/login.component';
import { AttractionsComponent } from './components/attractions/attractions.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'contact',
        canMatch: [authGuard],
        component: ContactComponent
    },
    {
        path: 'attractions',
        canMatch: [authGuard],
        // canActivate: [authGuard],
        component: AttractionsComponent,
    },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signin',
        component: SigninComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
];
