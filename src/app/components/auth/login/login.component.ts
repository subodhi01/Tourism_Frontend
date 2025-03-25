import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const { email, password } = this.loginForm.value;
    console.log('Login form submitted', { email, password });

    this.authService.login(email, password).subscribe({
      next: (response: any) => {
        console.log('Login successful, full response:', JSON.stringify(response, null, 2));
        // Check if we have the user data
        if (response && response.user) {
          console.log('User data found:', response.user);
          // Store the user data from the response
          this.authService.setUserData(response.user);
        } else {
          console.log('No user data in response:', response);
        }
        this.router.navigate(['/auth/home']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.error = error.error?.message || 'Login failed. Please try again.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}