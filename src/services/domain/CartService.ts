/* eslint-disable object-shorthand */
/* eslint-disable eqeqeq */
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/APIConfig';
import { Cart } from 'src/models/Cart';
import { CategoriaDTO } from 'src/models/CategoriaDTO';
import { ProdutoDTO } from 'src/models/ProdutoDTO';
import { StorageService } from '../StorageService';

@Injectable()
export class CartService {

  constructor(public storage: StorageService) {

  }

  //Cria um carrinho com uma lista de itens vazia
  createOrCleanCart(): Cart {
    const cart: Cart = {items: []};
    this.storage.setCart(cart);
    return cart;
  }

  getCart(): Cart {
    const cart = this.storage.getCart();
    if(cart == null) {
      this.createOrCleanCart();
    }

    return cart;

  }

  addProduto(produto: ProdutoDTO): Cart {
    const cart = this.getCart();
    /*findIndex() é um método do próprio Typescript que lista o numero de itens em um array. No meu caso
    ainda coloquei uma função pra verificar se o item do meu carrinho é o mesmo que veio como argumnto
    do método */
    const position = cart.items.findIndex(x => x.produto.id === produto.id);
    /*Por padrão o findIndex() retorna -1 se a lista ta vazia, então aqui eu verifico se esta vazia
     eu adiciono um item */
    if(position === -1) {
      cart.items.push({quantidade: 1, produto: produto});
    }

    this.storage.setCart(cart);
    return cart;





  }
}
