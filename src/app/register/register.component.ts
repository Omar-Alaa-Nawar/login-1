import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  step: number = 1; // Tracks the current step of the registration process
  registrationSuccess: boolean = false; // Flag to indicate successful registration
  message: string = ''; // To store success or error messages
  errorMessage: string = ''; // To store error messages
  registerData = {
    name: '',
    email: '',
    company: '',
    role: '',
    employees: '',
    industry: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  // Proceed to the next step of the registration process
  nextStep() {
    this.errorMessage = ''; // Reset error message at each step
    if (this.step === 1) {
      // Step 1: Check if required fields are filled
      if (this.registerData.name && this.registerData.email && this.registerData.company && this.registerData.role) {
        this.step++;
      } else {
        this.errorMessage = 'Please fill all fields in Step 1.';
      }
    } else if (this.step === 2) {
      // Step 2: Check if required fields are filled
      if (this.registerData.employees && this.registerData.industry) {
        this.step++;
      } else {
        this.errorMessage = 'Please fill all fields in Step 2.';
      }
    } else if (this.step === 3) {
      // Step 3: Validate password match and check if email is already registered
      if (this.registerData.password === this.registerData.confirmPassword) {
        if (this.isEmailRegistered(this.registerData.email)) {
          this.errorMessage = 'This email is already registered. Please use a different email.';
        } else {
          this.register(); // Save to local storage when the last step is valid
        }
      } else {
        this.errorMessage = 'Passwords do not match. Please try again.';
      }
    }
  }

  // Go to the previous step of the registration process
  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  // Register the user and save to local storage
  register() {
    console.log("Registration process started.");

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    existingUsers.push(this.registerData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    console.log("Registration successful. Navigating to login.");
    this.registrationSuccess = true; // Set success flag to show the success message
    this.message = 'Registration successful! Your information has been saved.'; // Set success message

    // Clear the form after successful registration
    this.registerData = {
      name: '',
      email: '',
      company: '',
      role: '',
      employees: '',
      industry: '',
      password: '',
      confirmPassword: ''
    };

    // Redirect to login page after registration
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000); // Delay navigation to allow user to see the success message
  }

  // Check if the email is already registered
  isEmailRegistered(email: string): boolean {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // Check if the email matches any user's email
    return existingUsers.some((user: { email: string }) => user.email === email);
  }

  // Navigate to login page
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
