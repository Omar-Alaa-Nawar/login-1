import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LeftSideComponent } from '../shared/left-side/left-side.component';
import { SharedModule } from '../shared.module';

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule, LeftSideComponent, SharedModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
    confirmPassword: '', // Add confirmPassword here
    selectedLanguage: 'en',
    confirmEmail: '' // Add confirmEmail if required
  };
  message: string = '';
  showSuccessMessage: boolean = false;
  isChangePasswordFlow: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false; // Add showConfirmPassword
  isEmailFocused = false;
  isPasswordFocused = false;

  constructor(private router: Router) {}

  // Login method (existing)
  login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const storedUser = users.find(
      (user: any) =>
        user.email === this.loginData.email &&
        user.password === this.loginData.password
    );

    if (storedUser) {
      localStorage.setItem('role', storedUser.role);
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate([`/${storedUser.role}-dashboard`]);
    } else {
      this.message = 'Invalid email or password.';
    }
  }

  // New method to handle password reset
  moveToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  forgotPassword() {
    this.moveToResetPassword(); // Use the method above
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
  }

  clearMessage() {
    this.message = '';
  }

  // Handle focus event
  onFocus(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    if (target.id === 'typeEmailX') {
      this.isEmailFocused = true;
    } else if (target.id === 'typePasswordX') {
      this.isPasswordFocused = true;
    }
  }

  // Handle blur event
  onBlur(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    if (target.id === 'typeEmailX') {
      this.isEmailFocused = false;
    } else if (target.id === 'typePasswordX') {
      this.isPasswordFocused = false;
    }
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Toggle confirm password visibility
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Validate password
  validatePassword() {
    if (this.loginData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
    } else {
      this.errorMessage = '';
    }
  }

  // You can add password requirements (for example)
  passwordRequirements() {
    return "Password should be at least 6 characters, contain a number, and a special character.";
  }
}
