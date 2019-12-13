import Storage from 'store';
import { StorageKeys } from './constants';

class TokenManager {

  /**
   * Singleton constructor
   * @return {Auth} this
   */
  static d() {

    return this.instance ? this.instance : this.instance = new TokenManager;

  }

  get accessToken() {

    return Storage.get(StorageKeys.ACCESS_TOKEN_KEY);

  }

  set accessToken(token) {

    Storage.set(StorageKeys.ACCESS_TOKEN_KEY, token);

  }

  removeAccessToken() {

    Storage.remove(StorageKeys.ACCESS_TOKEN_KEY);

  }

  get refreshToken() {

    return Storage.get(StorageKeys.REFRESH_TOKEN_KEY);

  }

  set refreshToken(token) {

    Storage.set(StorageKeys.REFRESH_TOKEN_KEY, token);

  }

  removeRefreshToken() {

    Storage.remove(StorageKeys.REFRESH_TOKEN_KEY);

  }

}

export default () => {

  return TokenManager.d();

}