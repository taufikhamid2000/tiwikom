import { User } from '../core/models/user.model';

export const mockUsers: User[] = [
  { userId: 'u1', fullName: 'Aiman', role: 'Senior', department: 'IT', username: 'aiman', password: 'aiman123' },
  { userId: 'u2', fullName: 'Farah', role: 'Intern', department: 'HR', username: 'farah', password: 'farah123' },
  { userId: 'u3', fullName: 'Rafiq', role: 'admin', department: 'Operations', username: 'admin', password: 'admin123' }
];
