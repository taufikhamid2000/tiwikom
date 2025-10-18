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
}
