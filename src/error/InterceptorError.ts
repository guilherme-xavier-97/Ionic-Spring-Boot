import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FieldMessage } from 'src/models/FieldMessage';
import { StorageService } from 'src/services/StorageService';

@Injectable()
export class InterceptorError implements HttpInterceptor {
  constructor(
    public storage: StorageService,
    public alertController: AlertController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //o método catch não fuciona mais nessa versão do ionic, precisa fazer o catch error dentro do pipe()
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorObj = error;
        if (errorObj.error) {
          errorObj = errorObj.error;
        }

        switch (error.status) {
          case 401:
            this.handle401();
            break;

          case 403:
            this.handle403();
            break;

          case 422:
            this.handle422(errorObj.error);
            break;

          default:
            this.dafaultError(errorObj);
            break;
        }
        return throwError(errorObj);
      }) as any
    );
  }

  async handle401() {
    const alert = await this.alertController.create({
      header: 'Erro 401: Falha na autenticação ',
      message: 'Usuário ou senha incorretos!',
      backdropDismiss: false,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async handle403() {
    this.storage.setLocalUser(null);
    const alert = await this.alertController.create({
      header: 'Erro 403: Acesso negado ',
      message: 'Acesso negado para esta aplicação!',
      backdropDismiss: false,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async handle422(errorObj) {
    const alert = await this.alertController.create({
      header: 'Erro 422: Validação',
      message: this.listErrors(errorObj),
      backdropDismiss: false,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async dafaultError(errorObj) {
    this.storage.setLocalUser(null);
    const alert = await this.alertController.create({
      header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      backdropDismiss: false,
      buttons: ['OK'],
    });

    await alert.present();
  }

   listErrors(messages: FieldMessage[]): string {
    let msgError = '';
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < messages?.length; i++) {
     msgError =
        msgError +
        '<p><strong>' +
        messages[i].fieldName +
        '</strong>: ' +
        messages[i].fieldMessage +
        '</p>';
    }

    return msgError;
  }
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const InterceptorErrorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorError,
  multi: true,
};
