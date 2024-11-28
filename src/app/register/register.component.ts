import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  step: number = 1; // Tracks the current step of the registration process
  registrationSuccess: boolean = false; // Flag to indicate successful registration
  message: string = ''; // To store success or error messages
  errorMessage: string = ''; // To store error messages
  emailExists: boolean = false; // Flag to track if the email is already registered
  passwordLength: boolean = false; // Flag to track password length requirement
  hasLowercase: boolean = false; // Flag for lowercase character requirement
  hasUppercase: boolean = false; // Flag for uppercase character requirement
  hasNumber: boolean = false; // Flag for number requirement

  // Register data with selectedLanguage
  registerData = {
    name: '',
    email: '',
    company: '',
    role: '',
    employees: '',
    industry: '',
    password: '',
    confirmPassword: '',
    otherRole: '',
    selectedLanguage: 'en'  // Default language
  };

  constructor(private router: Router) { }

  // Proceed to the next step of the registration process
  nextStep() {
    this.errorMessage = ''; // Reset error message at each step

    // Validate Step 1 fields (Name, Email, Company, Role)
    if (this.step === 1) {
      if (this.registerData.name && this.registerData.email && this.registerData.company && this.registerData.role) {
        this.step++;
      } else {
        this.errorMessage = 'Please fill all fields in Step 1.';
      }
    }

    // Validate Step 2 fields (Employees, Industry)
    else if (this.step === 2) {
      if (this.registerData.employees && this.registerData.industry) {
        this.step++;
      } else {
        this.errorMessage = 'Please fill all fields in Step 2.';
      }
    }

    // Validate Step 3 fields (Password, Confirm Password, Email)
    else if (this.step === 3) {
      if (this.registerData.password !== this.registerData.confirmPassword) {
        this.errorMessage = 'Passwords do not match. Please try again.';
      } else if (this.isEmailRegistered(this.registerData.email)) {
        this.errorMessage = 'This email is already registered. Please use a different email.';
      } else {
        this.register(); // Save to local storage when the last step is valid
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
  register(form?: NgForm) {
    console.log("Registration process started.");

    // Check if passwords match before proceeding
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'Passwords do not match. Please try again.';
      return; // Stop the registration process if passwords do not match
    }

    // Check if the email is already registered
    if (this.isEmailRegistered(this.registerData.email)) {
      this.errorMessage = 'This email is already registered. Please use a different email.';
      return; // Stop the registration process if the email is already registered
    }

    // If validation passes, proceed to save the data
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Add new user to the list
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
      confirmPassword: '',
      otherRole: '',
      selectedLanguage: 'en', // Default language
    };

    // Reset the form state
    if (form) {
      form.reset();
    }

    // Redirect to login page after registration
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000); // Delay navigation to allow user to see the success message
  }

  // Check if the email is already registered
  isEmailRegistered(email: string): boolean {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // Check if the email matches any user's email
    return existingUsers.some((user: { email: string }) => user.email === email);
  }

  // Check email as the user types
  onEmailChange() {
    this.emailExists = this.isEmailRegistered(this.registerData.email);
  }

  // Check password requirements as the user types
  checkPasswordStrength() {
    this.passwordLength = this.registerData.password.length >= 8;
    this.hasLowercase = /[a-z]/.test(this.registerData.password);
    this.hasUppercase = /[A-Z]/.test(this.registerData.password);
    this.hasNumber = /\d/.test(this.registerData.password);
  }

  // Getter for all password requirements
  get allRequirementsFulfilled(): boolean {
    return this.passwordLength && this.hasLowercase && this.hasUppercase && this.hasNumber;
  }

// Validate "Next" button state
isNextStepValid(): boolean {
  if (this.step === 1) {
    // Ensure that all required fields are filled and email is not already registered
    return (
      this.registerData.name !== '' &&
      this.registerData.email !== '' &&
      this.registerData.company !== '' &&
      this.registerData.role !== '' &&
      !this.emailExists
    );
  } else if (this.step === 2) {
    // Ensure that employees and industry are filled
    return this.registerData.employees !== '' && this.registerData.industry !== '';
  } else if (this.step === 3) {
    // Ensure passwords match and all password requirements are fulfilled
    return (
      this.registerData.password === this.registerData.confirmPassword &&
      this.allRequirementsFulfilled &&
      !this.emailExists
    );
  }
  return false;
}


  // Validate "Create Account" button state
  isCreateAccountValid(): boolean {
    return this.registerData.password === this.registerData.confirmPassword && this.allRequirementsFulfilled && !this.emailExists;
  }

  // Navigate to login page
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
