import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LeftSideComponent } from '../shared/left-side/left-side.component';
import { SharedModule } from '../shared.module'; // Import SharedModule to access LanguageDropdownComponent

@Component({
    selector: 'app-reset-password',
    imports: [CommonModule, FormsModule, LeftSideComponent, SharedModule], // Use SharedModule to access LanguageDropdownComponent
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  passwordMatchError: string = '';
  showSuccessMessage: boolean = false;
  isChangePasswordFlow: boolean = false;
  selectedLanguage: string = 'en'; // Add selectedLanguage property

  passwordRequirements = {
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
  };

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private router: Router) {}

  // Language change handler
  onLanguageChange(newLanguage: string) {
    this.selectedLanguage = newLanguage;
    console.log(`Language changed to: ${newLanguage}`);
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Toggle confirm password visibility
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Check password requirements
  validatePassword() {
    const password = this.password;

    this.passwordRequirements.length = password.length >= 8;
    this.passwordRequirements.number = /[0-9]/.test(password);
    this.passwordRequirements.lowercase = /[a-z]/.test(password);
    this.passwordRequirements.uppercase = /[A-Z]/.test(password);
  }

  confirmEmail() {
    const trimmedEmail = this.email.trim();
  
    if (!trimmedEmail) {
      this.errorMessage = 'Please enter your email.';
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === trimmedEmail);
  
    if (user) {
      this.errorMessage = '';
      this.showSuccessMessage = true;
      // Do not automatically switch to the next step
    } else {
      this.errorMessage = 'Email not found.';
    }
  }
  
  moveToResetPassword() {
    this.showSuccessMessage = false;
    this.isChangePasswordFlow = true;
  }
  

  resetPassword() {
    const trimmedPassword = this.password.trim();
    const trimmedConfirmPassword = this.confirmPassword.trim();

    if (!trimmedPassword || !trimmedConfirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      this.passwordMatchError = 'Passwords do not match.';
      return;
    }

    if (
      !this.passwordRequirements.length ||
      !this.passwordRequirements.number ||
      !this.passwordRequirements.lowercase ||
      !this.passwordRequirements.uppercase
    ) {
      this.errorMessage = 'Your password does not meet the required criteria.';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.email.trim());

    if (user) {
      user.password = trimmedPassword;
      localStorage.setItem('users', JSON.stringify(users));
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Something went wrong. Please try again.';
    }
  }

}