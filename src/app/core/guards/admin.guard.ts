import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if user has admin role
    if (!this.authService.hasRole('admin')) {
      console.log('Access denied: User does not have admin role');
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
