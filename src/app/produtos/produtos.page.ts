import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    },

    error => {});

  }

}
