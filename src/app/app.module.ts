import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy, } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriaService } from 'src/services/domain/CategoriaService';
import { InterceptorErrorProvider } from 'src/error/InterceptorError';
import { AuthService } from 'src/services/AuthService';
import { StorageService } from 'src/services/StorageService';
import { FolderPage } from './folder/folder.page';
import { ClienteService } from 'src/services/domain/ClienteService';
import { authMiddlewareProvider } from 'src/middlewares/authMiddleware';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [AppComponent],
  imports: [BrowserModule, HttpClientModule,  IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,
  },
  CategoriaService,
  authMiddlewareProvider,
  InterceptorErrorProvider,
  AuthService,
  StorageService,
  ClienteService
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
