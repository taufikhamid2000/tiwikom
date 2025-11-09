import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { mockUsers } from '../../mock-data/mock-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  getUsers(): User[] {
    return mockUsers;
  }

  getUserById(id: string): User | undefined {
    return mockUsers.find(u => u.userId === id);
  }

  addUser(user: User): boolean {
    // Check if user ID already exists
    if (mockUsers.find(u => u.userId === user.userId)) {
      return false;
    }
    // Set default password if not provided
    if (!user.password) {
      user.password = this.generateDefaultPassword();
    }
    mockUsers.push(user);
    return true;
  }

  changePassword(userId: string, oldPassword: string, newPassword: string): boolean {
    const user = mockUsers.find(u => u.userId === userId);
    if (!user) {
      return false;
    }
    
    // Verify old password
    if (user.password !== oldPassword) {
      return false;
    }
    
    // Update password
    user.password = newPassword;
    return true;
  }

  private generateDefaultPassword(): string {
    // Generate a simple default password (in production, use a stronger method)
    return 'Pass' + Math.floor(Math.random() * 100000);
  }
}
