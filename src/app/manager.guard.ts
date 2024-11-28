import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../app/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    if (this.authService.isAuthenticatedUser() && (role === 'manager' || role === 'admin')) {
      return true;
    }
    this.router.navigate(['/404']);
    return false;
  }
}
