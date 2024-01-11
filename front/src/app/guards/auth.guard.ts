import { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { AttractionsService } from '../services/attractionService/attractions.service';
import { map } from 'rxjs';

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

export const resolve = () => {
  const attService = inject(AttractionsService);
  return attService.loadData().pipe(
    map(() => attService.attractions())
  );
}
