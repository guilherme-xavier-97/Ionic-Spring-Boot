import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from 'src/config/APIConfig';
import { CartItem } from 'src/models/CartItem';
import { CartService } from 'src/services/domain/CartService';
import { ProdutoService } from 'src/services/domain/ProdutoService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: CartItem[];

  constructor(
    public cartService: CartService,
    public produtoService: ProdutoService,
    public location: Location) { }

  ngOnInit() {
    const cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i=0; i<this.items.length; i++) {
      const item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
        error => {});
    }
  }

  back() {
    this.location.back();
  }

}
