import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/APIConfig';
import { CredenciaisDTO } from 'src/models/CredenciaisDTO';

@Injectable()
export class AuthService {
  constructor(public http: HttpClient) {

  }

  authenticate(credenciais: CredenciaisDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      credenciais,
      {
        /*Assim eu consigo ter acesso ao header da resposta,
          já que no método POST da autenticação os dados estão no header,não no corpo*/
        observe: 'response',
        /*Por padrão ele tenta converter pra JSON, mas como vai ser corpo vazio
          eu digo que é uma response do tipo texto pra não ter problema de conversão*/
        responseType: 'text'
      }
    );
  }
}
