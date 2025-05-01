import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;
  loading = false;
  error = '';
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgetPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = false;

    const email = this.forgetPasswordForm.get('email')?.value;

    this.authService.forgetPassword(email).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = true;
        // Store email for the next step
        localStorage.setItem('resetEmail', email);
        // Navigate to verify OTP page
        this.router.navigate(['/auth/verify-reset-otp']);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.Message || 'Failed to send reset OTP. Please try again.';
      }
    });
  }
} 