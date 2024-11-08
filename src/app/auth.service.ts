import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private role: string | null = null;
  private isAuthenticated = false;

  constructor(private router: Router) {
    this.initializeAuthentication();
  }

  private initializeAuthentication() {
    const storedRole = localStorage.getItem('role');
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

    if (storedIsAuthenticated === 'true' && storedRole) {
      this.isAuthenticated = true;
      this.role = storedRole;
    }

    console.log('AuthService initialized: isAuthenticated:', this.isAuthenticated, 'Role:', this.role);
  }

  authenticate() {
    this.isAuthenticated = true;
    localStorage.setItem('isAuthenticated', 'true');
    console.log('User authenticated');
  }

  setRole(role: string) {
    this.role = role;
    localStorage.setItem('role', role);
    console.log('Role set:', role);
  }

  getRole(): string | null {
    console.log('Getting role:', this.role || localStorage.getItem('role'));
    return this.role || localStorage.getItem('role');
  }

  isAuthenticatedUser(): boolean {
    console.log('Checking authentication:', this.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true');
    return this.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';
  }

  logout() {
    this.isAuthenticated = false;
    this.role = null;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
    console.log('User logged out');
  }
}
