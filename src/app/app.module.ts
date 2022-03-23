import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriaService } from 'src/services/domain/CategoriaService';
import { interceptorErrorProvider } from 'src/error/interceptor.error';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule,  IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,
  },
  CategoriaService,
  interceptorErrorProvider
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
