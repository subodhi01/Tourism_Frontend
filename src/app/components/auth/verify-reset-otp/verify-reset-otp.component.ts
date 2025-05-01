import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-reset-otp',
  templateUrl: './verify-reset-otp.component.html',
  styleUrls: ['./verify-reset-otp.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class VerifyResetOtpComponent {
  verifyOtpForm: FormGroup;
  loading = false;
  error = '';
  email: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.email = localStorage.getItem('resetEmail') || '';
    if (!this.email) {
      this.router.navigate(['/auth/forget-password']);
    }

    this.verifyOtpForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  onSubmit() {
    if (this.verifyOtpForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const otp = this.verifyOtpForm.get('otp')?.value;

    this.authService.verifyResetOTP(this.email, otp).subscribe({
      next: (response) => {
        this.loading = false;
        // Store OTP for the next step
        localStorage.setItem('resetOTP', otp);
        // Navigate to reset password page
        this.router.navigate(['/auth/reset-password']);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.Message || 'Invalid or expired OTP. Please try again.';
      }
    });
  }

  resendOTP() {
    this.loading = true;
    this.error = '';

    this.authService.forgetPassword(this.email).subscribe({
      next: (response) => {
        this.loading = false;
        alert('New OTP sent successfully!');
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.Message || 'Failed to resend OTP. Please try again.';
      }
    });
  }
} 