import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';

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

  // Simulate login by matching username/password
  login(username: string, password: string): boolean {
    const mockUsers = [
      {
        userId: '1',
        fullName: 'Admin User',
        role: 'admin',
        department: 'Management',
        username: 'admin',
        password: '12345'
      },
      {
        userId: '2',
        fullName: 'Regular User',
        role: 'user',
        department: 'Engineering',
        username: 'user',
        password: 'abcde'
      }
    ];

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
