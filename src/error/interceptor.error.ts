import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from'rxjs/operators';

@Injectable()
export class InterceptorError implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Passou pelo interceptor');
    //o método catch não fuciona mais nessa versão do ionic, precisa fazer o catch error dentro do pipe()
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorObj = error;
        if(errorObj.error) {
          errorObj = errorObj.error;
        }

        console.log('Interceptador pegou o erro');
        console.log(errorObj);
        return throwError(errorObj);

      }) as any
    );
  }


}
export const interceptorErrorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorError,
    multi: true,
};


