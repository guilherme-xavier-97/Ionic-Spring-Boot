import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/APIConfig';
import { CredenciaisDTO } from 'src/models/CredenciaisDTO';
import { LocalUser } from 'src/models/LocalUser';
import { StorageService } from './StorageService';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartService } from './domain/CartService';

@Injectable()
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(public http: HttpClient, public storage: StorageService, public cartService: CartService) {

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

  refreshToken() {
    return this.http.post(
        `${API_CONFIG.baseUrl}/auth/refresh_token`,
        {},
        {
            observe: 'response',
            responseType: 'text'
        });
}

  successfulLogin(token: string) {
    const user: LocalUser = {
      token,
      email: this.jwtHelper.decodeToken(token).sub };
    this.storage.setLocalUser(user);
    this.cartService.createOrCleanCart();

  }

  lougout() {
    this.storage.setLocalUser(null);
  }
}
