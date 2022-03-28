import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from'rxjs/operators';
import { StorageService } from 'src/services/StorageService';
import { API_CONFIG } from  'src/config/APIConfig';

@Injectable()
export class AuthMiddleware implements HttpInterceptor {

  constructor(public storage: StorageService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const localUser = this.storage.getLocalUser();
    /*Aqui eu crio um jeito de comparar de a url da requisição é a da API, se for, eu mando o header
    senão eu não mando, não faz sentido enviar a autorização pra uma url que nao seja a da minha API*/
    const N = API_CONFIG.baseUrl.length;
    const requestToAPI = req.url.substring(0, N) === API_CONFIG.baseUrl;

    //Se tiver um usuario logado, ele clona a requisição e passa o authorization no header
    if(localUser && requestToAPI) {
      const authReq = req.clone({headers: req.headers.set('Authorization', localUser.token) });
      return next.handle(authReq);
    }

    else {
      return next.handle(req);
    }
  }


}
export const authMiddlewareProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthMiddleware,
    multi: true,
};
