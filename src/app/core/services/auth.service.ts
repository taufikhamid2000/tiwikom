import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { mockUsers } from '../../mock-data/mock-users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;

  constructor() {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  // Simulate login by matching email/name from mock data
  login(username: string, password: string): boolean {
  const mockUsers = [
    { username: 'admin', password: '12345' },
    { username: 'user', password: 'abcde' }
  ];

  const user = mockUsers.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }

  return false;
}

  // Logout clears stored user
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  // Return current user info
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // Role checking helper (for guards, admin pages, etc.)
  hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }
}
