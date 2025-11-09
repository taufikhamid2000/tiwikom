import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  isDarkMode = false;
  themeColor = '#1976d2';
  customColor = '';
  showCustomInput = false;
  availableColors = [
    { name: 'Blue', value: '#1976d2' },
    { name: 'Purple', value: '#9c27b0' },
    { name: 'Red', value: '#f44336' },
    { name: 'Green', value: '#4caf50' },
    { name: 'Orange', value: '#ff9800' },
    { name: 'Teal', value: '#009688' },
    { name: 'Indigo', value: '#3f51b5' },
    { name: 'Pink', value: '#e91e63' }
  ];

  // Password change properties
  showChangePassword = false;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  passwordError = '';
  passwordSuccess = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode();
    this.themeColor = this.themeService.getThemeColor();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
    this.cdr.markForCheck();
  }

  setThemeColor(color: string): void {
    this.themeColor = color;
    this.themeService.setThemeColor(color);
    this.showCustomInput = false;
    this.cdr.markForCheck();
  }

  applyCustomColor(): void {
    if (this.customColor && /^#[0-9A-F]{6}$/i.test(this.customColor)) {
      this.setThemeColor(this.customColor);
      this.customColor = '';
    }
  }

  toggleCustomInput(): void {
    this.showCustomInput = !this.showCustomInput;
    if (!this.showCustomInput) {
      this.customColor = '';
    }
    this.cdr.markForCheck();
  }

  resetSettings(): void {
    this.isDarkMode = false;
    this.themeColor = '#1976d2';
    this.showCustomInput = false;
    this.customColor = '';
    this.themeService.setDarkMode(false);
    this.themeService.setThemeColor('#1976d2');
    this.cdr.markForCheck();
  }

  toggleChangePassword(): void {
    this.showChangePassword = !this.showChangePassword;
    this.resetPasswordForm();
    this.cdr.markForCheck();
  }

  resetPasswordForm(): void {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordError = '';
    this.passwordSuccess = '';
  }

  changePassword(): void {
    this.passwordError = '';
    this.passwordSuccess = '';

    // Validation
    if (!this.currentPassword) {
      this.passwordError = 'Current password is required';
      return;
    }
    if (!this.newPassword) {
      this.passwordError = 'New password is required';
      return;
    }
    if (this.newPassword.length < 4) {
      this.passwordError = 'New password must be at least 4 characters';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Passwords do not match';
      return;
    }
    if (this.currentPassword === this.newPassword) {
      this.passwordError = 'New password must be different from current password';
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.passwordError = 'User not logged in';
      return;
    }

    // Attempt to change password
    const success = this.userService.changePassword(
      currentUser.userId,
      this.currentPassword,
      this.newPassword
    );

    if (success) {
      this.passwordSuccess = 'Password changed successfully!';
      this.resetPasswordForm();
      setTimeout(() => {
        this.showChangePassword = false;
        this.cdr.markForCheck();
      }, 2000);
    } else {
      this.passwordError = 'Current password is incorrect';
    }
  }
}

