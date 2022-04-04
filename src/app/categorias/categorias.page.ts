import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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

  constructor(public categoriaService: CategoriaService, public router: Router) { }

  ngOnInit() {
    this.categoriaService.findAll().subscribe(
    response => {
      this.items = response;
    },

    //Aqui eu posso deixar vazio pq o tratamento de erro esta sendo feito em src/errors/interceptor.error
    error => {});

  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  showProducts(categoria_id: string) {
    const data = JSON.stringify(categoria_id);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.router.navigate(['produtos'], {queryParams: {categorias: categoria_id}});
  }

}
