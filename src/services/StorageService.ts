import { STORAGE_KEYS } from 'src/config/LocalStorageConfig';
import { Cart } from 'src/models/Cart';
import { LocalUser } from 'src/models/LocalUser';

export class StorageService {

  getLocalUser(): LocalUser {
    const user = localStorage.getItem(STORAGE_KEYS.localUser);
    if (user == null) {
      return null;
    }

    return JSON.parse(user); //A response vem como string,então converto pra JSON


  }

  setLocalUser(obj: LocalUser) {
    if(obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }

    localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));//A response vem como JSON, então converto pra string


  }

  getCart(): Cart {
    const sessionData = localStorage.getItem(STORAGE_KEYS.cart);
    if (sessionData == null) {
      return null;
    }

    return JSON.parse(sessionData); //A response vem como string,então converto pra JSON


  }

  setCart(obj: Cart) {
    if(obj == null) {
      localStorage.removeItem(STORAGE_KEYS.cart);
    }

    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));//A response vem como JSON, então converto pra string


  }
}
