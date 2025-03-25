import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, OtpVerificationComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string = '';
  loading: boolean = false;
  showOTPVerification: boolean = false;
  userEmail: string = '';
  private apiUrl = 'https://localhost:44399/api'; // Updated API URL to match the running backend port

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['User']
    }, { validators: this.passwordMatchValidator });
  }

  // Custom Validator for Confirm Password
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  // Register method to handle form submission
  register() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';

      const formData = this.registerForm.value;
      console.log('Register form submitted successfully', formData);

      // Prepare the request data
      const requestData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        passwordHash: formData.password, // The backend will hash this
        role: formData.role || 'User'
      };

      // Make the API call with withCredentials option
      this.http.post(`${this.apiUrl}/auth/register`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      }).subscribe({
        next: (response: any) => {
          console.log('Registration successful:', response);
          this.userEmail = formData.email;
          this.showOTPVerification = true;
        },
        error: (error) => {
          console.error('Registration error:', error);
          if (error.error) {
            this.error = error.error.message || 'Registration failed';
          } else {
            this.error = 'Registration failed. Please try again.';
          }
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      console.log('Form is invalid');
      this.registerForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }
}