import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery = '';
  sortBy: 'name' | 'department' | 'role' = 'name';
  selectedUsers: Set<string> = new Set();
  showDeleteConfirm = false;
  deleteUserId: string | null = null;
  showAddUserForm = false;
  newUser: User = { userId: '', fullName: '', role: 'User', department: '', password: '' };
  addUserError = '';
  generatedPassword = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userService.getUsers();
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort(): void {
    let filtered = [...this.users];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        user =>
          user.fullName.toLowerCase().includes(query) ||
          user.department.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (this.sortBy) {
      case 'department':
        filtered.sort((a, b) => a.department.localeCompare(b.department));
        break;
      case 'role':
        filtered.sort((a, b) => a.role.localeCompare(b.role));
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.fullName.localeCompare(b.fullName));
        break;
    }

    this.filteredUsers = filtered;
  }

  onSearchChange(): void {
    this.applyFiltersAndSort();
  }

  onSortChange(): void {
    this.applyFiltersAndSort();
  }

  toggleSelectUser(userId: string): void {
    if (this.selectedUsers.has(userId)) {
      this.selectedUsers.delete(userId);
    } else {
      this.selectedUsers.add(userId);
    }
  }

  selectAll(): void {
    if (this.selectedUsers.size === this.filteredUsers.length) {
      this.selectedUsers.clear();
    } else {
      this.filteredUsers.forEach(user => this.selectedUsers.add(user.userId));
    }
  }

  isUserSelected(userId: string): boolean {
    return this.selectedUsers.has(userId);
  }

  isAllSelected(): boolean {
    return this.filteredUsers.length > 0 && this.selectedUsers.size === this.filteredUsers.length;
  }

  openDeleteConfirm(userId: string): void {
    this.deleteUserId = userId;
    this.showDeleteConfirm = true;
  }

  closeDeleteConfirm(): void {
    this.showDeleteConfirm = false;
    this.deleteUserId = null;
  }

  confirmDelete(): void {
    if (this.deleteUserId) {
      // In a real app, you would call a delete service
      this.selectedUsers.delete(this.deleteUserId);
      this.loadUsers();
      this.closeDeleteConfirm();
    }
  }

  deleteSelectedUsers(): void {
    if (this.selectedUsers.size === 0) return;

    const confirmDelete = confirm(
      `Are you sure you want to delete ${this.selectedUsers.size} user(s)? This action cannot be undone.`
    );

    if (confirmDelete) {
      // In a real app, you would call a delete service for each user
      this.selectedUsers.clear();
      this.loadUsers();
    }
  }

  viewUserDetails(userId: string): void {
    const user = this.userService.getUserById(userId);
    if (user) {
      // Could navigate to a user detail page if it existed
      console.log('View user details:', user);
    }
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }

  getRoleColor(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'badge-admin';
      case 'moderator':
        return 'badge-moderator';
      case 'user':
        return 'badge-user';
      default:
        return 'badge-default';
    }
  }

  openAddUserForm(): void {
    this.showAddUserForm = true;
    this.newUser = { userId: '', fullName: '', role: 'User', department: '', password: '' };
    this.generatedPassword = '';
    this.addUserError = '';
  }

  closeAddUserForm(): void {
    this.showAddUserForm = false;
    this.newUser = { userId: '', fullName: '', role: 'User', department: '', password: '' };
    this.generatedPassword = '';
    this.addUserError = '';
  }

  submitAddUser(): void {
    this.addUserError = '';

    // Validation
    if (!this.newUser.userId.trim()) {
      this.addUserError = 'User ID is required';
      return;
    }
    if (!this.newUser.fullName.trim()) {
      this.addUserError = 'Full Name is required';
      return;
    }
    if (!this.newUser.department.trim()) {
      this.addUserError = 'Department is required';
      return;
    }

    // Attempt to add user (service will generate password)
    const success = this.userService.addUser(this.newUser);
    if (!success) {
      this.addUserError = 'User ID already exists. Please use a different ID.';
      return;
    }

    // Get the created user to show their password
    const createdUser = this.userService.getUserById(this.newUser.userId);
    if (createdUser) {
      this.generatedPassword = createdUser.password || '';
    }

    // Success - reload list
    this.loadUsers();
  }

  copyPasswordToClipboard(): void {
    if (this.generatedPassword) {
      navigator.clipboard.writeText(this.generatedPassword).then(() => {
        alert('Password copied to clipboard!');
      });
    }
  }
}
