/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { identity } from 'rxjs';
import { API_CONFIG } from 'src/config/APIConfig';
import { ProdutoDTO } from 'src/models/ProdutoDTO';
import { ProdutoService } from 'src/services/domain/ProdutoService';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor(
    public activetedRoute: ActivatedRoute,
    public produtoService: ProdutoService,
    public location: Location) { }

  ngOnInit() {
     const produto_id = this.activetedRoute.snapshot.queryParamMap.get('produtos');
     this.produtoService.findById(produto_id).subscribe(response => {
       this.item=response;
       this.getBucketImage();
     },

     error =>{});


  }

  getBucketImage() {
    this.produtoService.getSmallImageFromBucket(this.item.id).subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}-small.jpg`;
    },
    error => {});
  }
  back() {
    this.location.back();
  }

}
