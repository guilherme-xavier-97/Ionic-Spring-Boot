import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/APIConfig';
import { ClienteDTO } from 'src/models/ClienteDTO';
import { StorageService } from '../StorageService';

@Injectable()
export class ClienteService {
  constructor(public http: HttpClient, public storage: StorageService) {

  }

  findByEmail(email: string): Observable<ClienteDTO> {
    const token = this.storage.getLocalUser().token;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const authHeader = new HttpHeaders({Authorization: token});
    return this.http.get<ClienteDTO>(
      `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
      {headers: authHeader}
    );
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, {responseType : 'blob'});
}


}
