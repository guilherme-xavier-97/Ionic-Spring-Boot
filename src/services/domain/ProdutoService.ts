import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/APIConfig';


@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  findByCategoria(categoria_id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }
}
