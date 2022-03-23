import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from 'src/config/APIConfig';
import { CategoriaDTO } from 'src/models/CategoriaDTO';
import { CategoriaService } from 'src/services/domain/CategoriaService';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items: CategoriaDTO[];

  constructor(public categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.findAll().subscribe(
    response => {
      this.items = response;
    },

    //Aqui eu posso deixar vazio pq o tratamento de erro esta sendo feito em src/errors/interceptor.error
    error => {});

  }

}
