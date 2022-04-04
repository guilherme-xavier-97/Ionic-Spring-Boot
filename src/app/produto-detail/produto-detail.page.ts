import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/ProdutoDTO';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor() { }

  ngOnInit() {
    this.item = {
      id: 1,
      nome: 'Computador',
      preco: 2500.99
    };
  }

}
