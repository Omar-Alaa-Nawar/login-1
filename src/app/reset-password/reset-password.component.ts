import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  errorMessage: string = '';
  passwordMatchError: string = ''; // New error message for password mismatch

  @Input() isChangePasswordFlow: boolean = false;
  @Input() backgroundColor: string = 'white';
  @Output() backToHome = new EventEmitter<void>();

  constructor(private router: Router) {}

  resetPassword() {
    // Trim inputs to avoid whitespace-only entries
    const trimmedEmail = this.email.trim();
    const trimmedPassword = this.password.trim();
    const trimmedConfirmPassword = this.confirmPassword.trim();

    // Check for empty fields
    if (!trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      this.message = '';
      this.passwordMatchError = ''; // Clear password match error
      return;
    }

    // Check if passwords match
    if (trimmedPassword !== trimmedConfirmPassword) {
      this.passwordMatchError = 'Passwords do not match.';
      this.errorMessage = '';
      this.message = '';
      return;
    } else {
      this.passwordMatchError = ''; // Clear password match error if they match
    }

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === trimmedEmail);

    if (user) {
      // Update the user's password
      user.password = trimmedPassword;
      localStorage.setItem('users', JSON.stringify(users));

      // Display success message and reset form
      this.message = 'Password reset successful. You can now log in.';
      this.errorMessage = '';
      this.clearForm();

      // Navigate to login after a brief delay (optional)
      setTimeout(() => this.goToLogin(), 1500);
    } else {
      // Display error message if email is not found
      this.errorMessage = 'Email not found.';
      this.message = '';
      this.passwordMatchError = ''; // Clear password match error if not relevant
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
