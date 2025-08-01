export class LocalStorage {
  private storage: Storage;
  private tokenKey = "matchlent-token";
  private expiredTime = "expired_time";
  private userTypeKey = "userType";

  constructor() {
    this.storage = localStorage;
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: unknown) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  getToken() {
    return this.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    this.setItem(this.tokenKey, token);
  }

  removeToken() {
    this.removeItem(this.tokenKey);
  }

  getExpiredTime() {
    return this.getItem(this.expiredTime);
  }

  setExpiredTime(time: number): void {
    this.setItem(this.expiredTime, time);
  }

  removeExpiredTime() {
    this.removeItem(this.expiredTime);
  }

  // New methods for userType
  getUserType(): string | null {
    return this.getItem(this.userTypeKey);
  }

  setUserType(userType: string): void {
    this.setItem(this.userTypeKey, userType);
  }

  removeUserType(): void {
    this.removeItem(this.userTypeKey);
  }
}

export const storage: Readonly<LocalStorage> = Object.freeze(
  new LocalStorage()
);
