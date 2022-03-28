import { STORAGE_KEYS } from 'src/config/LocalStorageConfig';
import { LocalUser } from 'src/models/LocalUser';

export class StorageService {

  getLocalUser(): LocalUser {
    const user = localStorage.getItem(STORAGE_KEYS.localUser);
    if (user == null) {
      return null;
    }

    else {
      return JSON.parse(user); //A response vem como string,então converto pra JSON
    }

  }

  setLocalUser(obj: LocalUser) {
    if(obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }

    else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));//A response vem como JSON, então converto pra string
    }

  }
}
