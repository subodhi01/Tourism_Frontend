import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

interface User {
  id: string;
  fullName: string;
  email: string;
  telephone: string;
  profilePhoto: string | null;
  role: string;
  isEmailVerified: boolean;
}

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  resetPasswordForm: FormGroup;
  editMode = false;
  profilePicture: string | null = null;
  loading = true;
  error: string | null = null;
  isBrowser: boolean;

  // User data from backend
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Initialize forms
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.fetchUserProfile();
  }

  async fetchUserProfile() {
    try {
      if (!this.isBrowser) return;

      const currentUser = this.authService.getUserData();
      if (!currentUser || !currentUser.id) {
        console.error('No user data available');
        this.router.navigate(['/auth/login']);
        return;
      }

      console.log('Fetching profile for user:', currentUser.id);
      const response = await this.http.get<any>(`https://localhost:44399/api/auth/profile?email=${currentUser.email}`).toPromise();
      
      if (!response || !response.user) {
        throw new Error('Invalid response from server');
      }

      this.user = response.user;
      this.profilePicture = this.user?.profilePhoto || null;
      
      // Update form with user data
      this.profileForm.patchValue({
        fullName: this.user?.fullName,
        email: this.user?.email,
        telephone: this.user?.telephone
      });

      console.log('Profile data loaded:', this.user);
    } catch (error) {
      this.error = 'Failed to fetch profile data';
      console.error('Error fetching profile:', error);
      this.router.navigate(['/auth/login']);
    } finally {
      this.loading = false;
    }
  }

  // Custom Validator for Password Match
  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmNewPassword = form.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword ? null : { mismatch: true };
  }

  // Toggle Edit Mode
  toggleEditMode() {
    if (this.editMode) {
      this.saveProfile();
    }
    this.editMode = !this.editMode;
  }

  // Save Profile Changes
  async saveProfile() {
    if (this.profileForm.valid) {
      try {
        const formValue = this.profileForm.value;
        // Add API call to update profile here
        console.log('Profile updated:', formValue);
        this.editMode = false;
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  // Delete Profile
  async deleteProfile() {
    if (confirm('Are you sure you want to delete your profile?')) {
      try {
        // Add API call to delete profile here
        console.log('Profile deleted');
        localStorage.removeItem('userEmail');
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  }

  // Reset Password
  async resetPassword() {
    if (this.resetPasswordForm.valid) {
      try {
        // Add API call to reset password here
        console.log('Password reset:', this.resetPasswordForm.value);
        this.resetPasswordForm.reset();
      } catch (error) {
        console.error('Error resetting password:', error);
      }
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  // Handle Profile Picture Upload
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture = reader.result as string;
        console.log('Profile picture updated');
        // Add API call to save picture here
      };
      reader.readAsDataURL(file);
    }
  }
}