/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { API_CONFIG } from 'src/config/APIConfig';
import { ProdutoDTO } from 'src/models/ProdutoDTO';
import { ProdutoService } from 'src/services/domain/ProdutoService';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];

  constructor(
    public router: Router,
    public produtoService: ProdutoService,
    public activetedRoute: ActivatedRoute) { }

  ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const categoria_id = this.activetedRoute.snapshot.queryParamMap.get('categorias');
    this.produtoService.findByCategoria(categoria_id).subscribe(response => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.items = response['content'];
      this.loadImageUrls();
    },

    error => {});

  }

  loadImageUrls() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i=0; i<this.items.length; i++) {
      const item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }

  showDetails(produto_id: string) {
    this.router.navigate(['produto-detail'], {queryParams: {produtos: produto_id}});
  }
}
