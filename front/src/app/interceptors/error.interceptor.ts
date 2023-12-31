import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  let snackBar = inject (SnackbarComponent);

  return next(req).pipe(catchError((error)=>{
    if ([401].includes(error.status)){
      snackBar.openSnackBar('Los datos son incorrectos', 'OK');
    }
    else if([402].includes(error.status)){
      snackBar.openSnackBar('Ya existe un usuario con ese nombre. Pruebe uno diferente.', 'OK');
    }
    else if([500].includes(error.status)){
      snackBar.openSnackBar('Server Error', 'Close');
    }
    return throwError(()=> error);
  }));
};
