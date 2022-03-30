import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/APIConfig';
import { EstadoDTO } from 'src/models/EstadoDTO';


@Injectable()
export class EstadoService {

  constructor(public http: HttpClient) {

  }

  findAll(): Observable<EstadoDTO[]>  {
    return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
}
}
