import { Injectable, inject, signal } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { environments } from '../../../assets/environments/environments';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../../interfaces/req-res';
import { Router } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly baseUrl:string = environments.baseUrl;
  private http = inject( HttpClient)
  private rta = false;
  private cookies = inject(CookieService);
  // private _currentUser = signal<User|null>(null)
  // private _authStatus = signal<AuthStatus>();

  constructor(private router: Router) {
    
  }

  //esta funcion retorna un observable de un booleano
  getAuthToken(): Observable<boolean>{
    return of(this.rta);
  }

  login(userName: string, password: string){
    const data = {
      userName: userName, 
      password: password
    };
    this.http.post('http://localhost:4000/api/auth/login', data)
    .pipe(delay(1000), 
          map((response: any) => response.body))
      .subscribe(
        (token: string) => {
          alert('User logged in');
          this.rta = true;
          this.router.navigate(['/']);
    
          // Ahora puedes utilizar 'token' como desees, por ejemplo, guardándolo en una variable de clase.
          this.guardarToken(token);
        },
        (error)=>{ 
          this.rta = false;
        }
      );
  }

  private guardarToken(token: string): void {
    console.log(token);
    
    // Aquí puedes realizar acciones adicionales, como almacenar el token en localStorage o en una variable de clase.
    // Ejemplo:
    // this.authService.setToken(token);
  }

  signin(name: string, userName: string, password: string){
    const data = {
      name: name,
      userName: userName, 
      password: password,
      roles: "user",
      activo: 1
    };
    this.http.post<UserResponse>('http://localhost:4000/api/usuarios', data)
    .pipe(delay(1000))
      .subscribe(
        (response) => {
          // alert('User signed in');
          //redireccionar al login
          this.router.navigate(['/login']);
        },
        (error)=>{
          
          
        }
      );
  }

  
  

}


