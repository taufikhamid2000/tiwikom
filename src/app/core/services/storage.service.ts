import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  getItem(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    if (this.isBrowser) localStorage.removeItem(key);
  }

  clear(): void {
    if (this.isBrowser) localStorage.clear();
  }
}
