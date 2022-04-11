import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagamentoPageRoutingModule } from './pagamento-routing.module';

import { PagamentoPage } from './pagamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagamentoPageRoutingModule,
    ReactiveFormsModule, //Esse não estava na aula, mas como peguei um template de formulário reativo, precisei importar
    ],

  declarations: [PagamentoPage
  ],

})
export class PagamentoPageModule {}
