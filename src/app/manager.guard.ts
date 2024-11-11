import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole();
    const isAuthenticated = this.authService.isAuthenticatedUser();
    const url = state.url;

    console.log('ManagerGuard Check:', { role, isAuthenticated, url });

    // Allow access for both 'admin' and 'manager' roles to the manager-dashboard and employee-dashboard
    if (isAuthenticated && (role === 'manager' || role === 'admin')) {
      if (url.includes('manager-dashboard') || url.includes('employee-dashboard')) {
        return true;
      } else {
        // Redirect to 404 page if access is denied
        console.log('Access denied. Redirecting to 404 page.');
        this.router.navigate(['/404']);
        return false;
      }
    }

    // If not authenticated or neither manager nor admin, deny access and redirect to 404
    console.log('Manager access denied. Redirecting to 404 page.');
    this.router.navigate(['/404']);
    return false;
  }
}
