import { Injectable, inject } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { environments } from '../../../assets/environments/environments';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../../interfaces/req-res';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly baseUrl:string = environments.baseUrl;
  private http = inject( HttpClient);
  
  private rta:boolean = false;
  private cookies = inject(CookieService);

  constructor(private router: Router, private snackBar: SnackbarComponent) {
    
  }

  //esta funcion retorna un observable de un booleano
  getAuthToken(): Observable<boolean>{
    if (this.cookies.get("rta")==="true")
      return of(true);
    else
      return of (false);
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
        (token) => {
          this.snackBar.openSnackBar('User succesfully logged in', 'Hide');
          this.rta = true;
          this.cookies.set("rta", "true");
          this.router.navigate(['/']);
          this.guardarToken(token);
        },
        (error)=>{ 
          this.rta = false;
          this.cookies.set("rta", "false");
        }
      );
  }

  getIdToken(){
    return this.cookies.get("token");
  }

  estaLogueado(){
    return this.cookies.get("token");
  }

  logOut(){
    //   const expirationDate = new Date();
    // expirationDate.setDate(expirationDate.getDate() + 30);

    // this.cookies.set("token", '', { expires: expirationDate });
    this.cookies.set("rta", "false");
    this.cookies.set("token", "");
    console.log('Log out perro');
    this.router.navigate(['/']);
    this.rta = false;
  }

  private guardarToken(token: any): void {
    console.log(token);
    this.cookies.set("token", token);
    this.cookies.set("rta", "true");
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
          this.snackBar.openSnackBar('User succesfully signed in', 'Hide');
          //redireccionar al login
          this.router.navigate(['/login']);
        },
        (error)=>{
          
          
        }
      );
  }

}


