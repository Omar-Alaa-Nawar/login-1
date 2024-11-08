import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

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

  @Input() isChangePasswordFlow: boolean = false; // Determine which flow we're in (Forgot or Change password)
  @Input() backgroundColor: string = 'white'; // Input for background color
  @Output() backToHome = new EventEmitter<void>(); // Event emitter for back to home action

  constructor(private router: Router) {}

  resetPassword() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.message = 'Please fill in all fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.email);

    if (user) {
      user.password = this.password; // Update the user's password
      localStorage.setItem('users', JSON.stringify(users));
      this.message = 'Password reset successful. You can now log in.';
      this.goToLogin(); // Always go to login after successful reset
    } else {
      this.message = 'Email not found.';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']); // Navigate to login after password reset
  }
}
