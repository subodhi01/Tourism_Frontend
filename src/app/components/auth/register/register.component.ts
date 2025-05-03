import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
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
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['User']
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';

      const formData = this.registerForm.value;
      const requestData = {
        fullName: formData.fullName,
        email: formData.email,
        telephoneNumber: formData.telephoneNumber,
        password: formData.password,
        role: formData.role || 'User'
      };

      console.log('Register form submitted:', JSON.stringify(requestData, null, 2));

      this.authService.register(requestData).subscribe({
        next: (response: any) => {
          console.log('Registration successful:', response);
          this.userEmail = formData.email;
          this.showOTPVerification = true;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Registration error:', error);
          this.error = error.error?.message || 'Registration failed. Please check your input and try again.';
          console.log('Error details:', JSON.stringify(error, null, 2));
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      console.log('Form is invalid:', this.registerForm.errors);
      this.registerForm.markAllAsTouched();
    }
  }
}