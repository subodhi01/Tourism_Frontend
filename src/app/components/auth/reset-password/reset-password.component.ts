import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  loading = false;
  error = '';
  email: string;
  otp: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.email = localStorage.getItem('resetEmail') || '';
    this.otp = localStorage.getItem('resetOTP') || '';
    
    if (!this.email || !this.otp) {
      this.router.navigate(['/auth/forget-password']);
    }

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const password = this.resetPasswordForm.get('password')?.value;

    this.authService.resetPassword(this.email, this.otp, password).subscribe({
      next: (response) => {
        this.loading = false;
        // Clear stored data
        localStorage.removeItem('resetEmail');
        localStorage.removeItem('resetOTP');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.Message || 'Failed to reset password. Please try again.';
      }
    });
  }
} 