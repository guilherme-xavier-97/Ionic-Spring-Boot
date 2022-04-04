import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/APIConfig';


@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  findByCategoria(categoria_id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }

  getSmallImageFromBucket(id: number): Observable<any> {
    const url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    return this.http.get(url, {responseType : 'blob'});
  }
}
