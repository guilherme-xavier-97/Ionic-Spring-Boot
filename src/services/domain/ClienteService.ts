import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/APIConfig';
import { ClienteDTO } from 'src/models/ClienteDTO';
import { StorageService } from '../StorageService';

@Injectable()
export class ClienteService {
  constructor(public http: HttpClient, public storage: StorageService) {}

  findByEmail(email: string) {
    return this.http.get(
      `${API_CONFIG.baseUrl}/clientes/email?value=${email}`
    );
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, { responseType: 'blob' });
  }

  insert(obj: ClienteDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/clientes`, obj, {
      observe: 'response',
      responseType: 'text',
    });
  }
}
