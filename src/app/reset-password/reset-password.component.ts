import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LeftSideComponent } from '../shared/left-side/left-side.component'; // Import LeftSideComponent

@Component({
  selector: 'app-reset-password',
  standalone: true,  // Standalone component
  imports: [CommonModule, FormsModule, RouterModule, LeftSideComponent], // Add LeftSideComponent here
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  errorMessage: string = '';
  passwordMatchError: string = '';

  @Input() isChangePasswordFlow: boolean = false;
  @Input() backgroundColor: string = 'white';
  @Output() backToHome = new EventEmitter<void>();

  constructor(private router: Router) {}

  resetPassword() {
    const trimmedEmail = this.email.trim();
    const trimmedPassword = this.password.trim();
    const trimmedConfirmPassword = this.confirmPassword.trim();

    if (!trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      this.message = '';
      this.passwordMatchError = '';
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      this.passwordMatchError = 'Passwords do not match.';
      this.errorMessage = '';
      this.message = '';
      return;
    } else {
      this.passwordMatchError = '';
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === trimmedEmail);

    if (user) {
      user.password = trimmedPassword;
      localStorage.setItem('users', JSON.stringify(users));
      this.message = 'Password reset successful. You can now log in.';
      this.errorMessage = '';
      this.clearForm();

      setTimeout(() => this.goToLogin(), 1500);
    } else {
      this.errorMessage = 'Email not found.';
      this.message = '';
      this.passwordMatchError = '';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  clearForm() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
