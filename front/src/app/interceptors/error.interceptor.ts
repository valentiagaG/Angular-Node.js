import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error)=>{
    if([404].includes(error.status)){
      console.log('Not found');
      //accountService.logout();
    }
    else if ([401].includes(error.status)){
      alert('Los datos son incorrectos');
    }
    else if([402].includes(error.status)){
      alert('Ya existe un usuario con ese nombre. Pruebe uno diferente.');
    }
    else if([500].includes(error.status)){
      alert('Server Error');
    }
    // console.log(error.message);
    return throwError(()=> error);
  }));
};
