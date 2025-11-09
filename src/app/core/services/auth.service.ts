import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { mockUsers } from '../../mock-data/mock-users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;

  constructor(private storage: StorageService) {
    // Check if user is already logged in
    const savedUser = this.storage.getItem('user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  // Login by matching username/password from mockUsers
  login(username: string, password: string): boolean {
    const user = mockUsers.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      this.storage.setItem('user', JSON.stringify(user));
      this.currentUser = user;
      return true;
    }

    return false;
  }

  logout(): void {
    this.currentUser = null;
    this.storage.removeItem('user');
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }
}
