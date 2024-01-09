import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, finalize } from 'rxjs';

let _activeRequest = 0;
export const spinnerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn):Observable<HttpEvent<unknown>> => {
  let _ngxUiLoaderService = inject(NgxUiLoaderService);
  console.log(req.url);
  
  console.log('**INGRESANDO AL INTERCEPTOR**');
  if (_activeRequest === 0) {
    _ngxUiLoaderService.start();
  }
  _activeRequest++; //1

  return next(req).pipe(finalize(() => {_activeRequest--;
    if (_activeRequest === 0) {
      _ngxUiLoaderService.stop();
    }}));
};

