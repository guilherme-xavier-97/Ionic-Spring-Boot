import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { PagamentoDTO } from 'src/models/PagamentoDTO';
import { PedidoDTO } from 'src/models/PedidoDTO';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
  providers: [NavParams]
})
export class PagamentoPage implements OnInit {

  pedido: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  formGroup: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public activetedRoute: ActivatedRoute,
    public location: Location,
    public navParams: NavParams,
    public navCtrl: NavController
    ) {
      this.pedido = this.navParams.get('finalizar-pedido');
      this.formGroup = this.formBuilder.group({
        //Defino como padrão o pagamento com cartão e 1 parcela (os nomes tem que estar iguais no back end)
        numeroDeParcelas: [1, Validators.required],
        '@type': ['pagamentoComCartao', Validators.required]
      });
     }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  confirmacaoDePedido() {
    this.pedido = this.formGroup.value;
    console.log(this.pedido);

  }

}
