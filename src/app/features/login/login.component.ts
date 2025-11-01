import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; // ✅ correct import

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {} // ✅ no provider needed

  login() {
    console.log('Attempting login with:', this.username, this.password); // Debug log
    const success = this.authService.login(this.username, this.password);
    if (success) {
      console.log('Login successful, redirecting...'); // Debug log
      this.errorMessage = '';
      this.router.navigate(['/home']); // Redirect to home on success
    } else {
      console.log('Login failed'); // Debug log
      this.errorMessage = 'Invalid username or password';
    }
  }
}
