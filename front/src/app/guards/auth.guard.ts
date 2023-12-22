import { CanActivateFn, CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {
//   //aca me interesa verificar segun el servicio auth que creamos
//   //1ro inyectamos nuestro servicio:

//   const authService = inject(AuthService);
//   console.log(authService.getAuthToken());
//   return authService.getAuthToken();
// };


export const authGuard: CanMatchFn = (route, state) => {
  //aca me interesa verificar segun el servicio auth que creamos
  //1ro inyectamos nuestro servicio:

  const authService = inject(AuthService);
  console.log(authService.getAuthToken());
  
  return authService.getAuthToken();
};