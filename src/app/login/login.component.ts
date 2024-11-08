import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  message: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const storedUser = users.find(
      (user: any) =>
        user.email === this.loginData.email &&
        user.password === this.loginData.password
    );

    if (storedUser) {
      console.log('Login successful', storedUser);
      this.authService.setRole(storedUser.role);
      this.authService.authenticate();
      this.router.navigate([`/${storedUser.role}-dashboard`]);
    } else {
      console.error('Login failed');
      this.message = 'Either email or password is not correct. Please try again.';
    }
  }

  forgotPassword() {
    this.router.navigate(['/reset-password']);
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
  }
}
