import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavController } from '@ionic/angular';

import { FinalizarPedidoPageRoutingModule } from './finalizar-pedido-routing.module';

import { FinalizarPedidoPage } from './finalizar-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizarPedidoPageRoutingModule,

  ],
  declarations: [FinalizarPedidoPage,
    NavController,
  ],
})
export class FinalizarPedidoPageModule {}
