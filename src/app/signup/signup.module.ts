import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { CidadeService } from 'src/services/domain/CidadeService';
import { EstadoService } from 'src/services/domain/EstadoService';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    ReactiveFormsModule //Esse não estava na aula, mas como peguei um template de formulário reativo, precisei importar
  ],
  declarations: [SignupPage],
  providers: [
    CidadeService,
    EstadoService
  ]
})
export class SignupPageModule {}
