/* eslint-disable @typescript-eslint/dot-notation */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnderecoDTO } from 'src/models/EnderecoDTO';
import { PedidoDTO } from 'src/models/PedidoDTO';
import { CartService } from 'src/services/domain/CartService';
import { ClienteService } from 'src/services/domain/ClienteService';
import { StorageService } from 'src/services/StorageService';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.page.html',
  styleUrls: ['./finalizar-pedido.page.scss'],
})
export class FinalizarPedidoPage implements OnInit {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(
    public location: Location,
    public storage: StorageService,
    public clienteService: ClienteService,
    public router: Router,
    public cartService: CartService) { }

  ngOnInit() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];

          const cart = this.cartService.getCart();

          this.pedido = {
            cliente: {id: response['id']},
            enderecoDaEntrega: null,
            pagamento: null,
            /**Essa função map vai percorrer a lista de itens do meu carrinho e a função lambda
             * que eu coloquei vai converter o formato dos objetos que estão no carrinho (que são do tipo
             *CartItem, que herda atributos do ProdutoDTO então possuem produto,quantidade, imageUrl e id)
             Mas eu só quero a quantidade e o id, então faço essa função pra retornar só o que preciso
             */
            itens: cart.items.map(x => ({quantidade: x.quantidade, produto: {id: x.produto.id}}))
          };
        },
        error => {
          if (error.status === 403) {
            this.router.navigateByUrl('');
          }
        });
  }

    }

  back() {
    this.location.back();
  }

  finalizarPedido(item: EnderecoDTO) {
    this.pedido.enderecoDaEntrega = {id: item.id};
    console.log(this.pedido);
  }
  }
