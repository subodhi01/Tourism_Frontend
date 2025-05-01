import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  loading: boolean = false;
  returnUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || null;
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
        if (response && response.user) {
          console.log('User data found:', response.user);
          this.authService.setUserData(response.user);
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigate(['/auth/home']);
          }
        } else {
          console.error('No user data in response:', response);
          this.error = 'Login failed: No user data returned.';
          this.loading = false;
        }
      },
      error: (error: any) => {
        console.error('Login error:', JSON.stringify(error, null, 2));
        this.error = error.error?.message || 'Login failed. Please check your credentials.';
        this.loading = false;
      },
      complete: () => {
        console.log('Login request completed');
        this.loading = false;
      }
    });
  }
}