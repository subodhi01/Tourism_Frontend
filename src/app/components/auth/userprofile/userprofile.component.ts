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
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

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
    this.editMode = !this.editMode;
    if (!this.editMode) {
      // Reset form to current user data when exiting edit mode
      this.profileForm.patchValue({
        fullName: this.user?.fullName,
        email: this.user?.email,
        telephone: this.user?.telephone
      });
    }
  }

  // Cancel Edit Mode
  cancelEdit() {
    this.editMode = false;
    // Reset form to current user data
    this.profileForm.patchValue({
      fullName: this.user?.fullName,
      email: this.user?.email,
      telephone: this.user?.telephone
    });
  }

  // Save Profile Changes
  async saveProfile() {
    console.log('Starting profile update...');
    if (this.profileForm.valid) {
      try {
        const formValue = this.profileForm.value;
        const currentUser = this.authService.getUserData();

        console.log('Current form values:', formValue);
        console.log('Current user data:', currentUser);

        if (!currentUser || !currentUser.email) {
          console.error('No user data available');
          this.error = 'No user data available. Please log in again.';
          return;
        }

        const updateData = {
          email: currentUser.email,
          fullName: formValue.fullName,
          telephoneNumber: formValue.telephone
        };

        console.log('Sending update request with data:', updateData);

        const response = await this.http.put<any>(
          'https://localhost:44399/api/auth/profile',
          updateData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            withCredentials: true
          }
        ).toPromise();

        console.log('Raw API response:', response);

        if (response && (response.Message === 'Profile updated successfully' || response.message === 'Profile updated successfully')) {
          console.log('Profile update successful');
          // Update local user data
          if (this.user) {
            this.user.fullName = formValue.fullName;
            this.user.telephone = formValue.telephone;
          }
          this.editMode = false;
          this.error = null;
          // Show success message
          alert('Profile updated successfully');
          // Force a refresh of the profile data
          await this.fetchUserProfile();
        } else {
          console.error('Unexpected response format:', response);
          throw new Error(response?.Message || response?.message || 'Failed to update profile');
        }
      } catch (error: any) {
        console.error('Detailed error:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error response:', error.error);
        this.error = error.error?.Message || error.message || 'Failed to update profile. Please try again.';
        // Keep the form in edit mode if there's an error
        this.editMode = true;
      }
    } else {
      console.log('Form validation failed:', this.profileForm.errors);
      this.profileForm.markAllAsTouched();
      this.error = 'Please fill in all required fields correctly.';
    }
  }

  // Delete Profile
  async deleteProfile() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const currentUser = this.authService.getUserData();
        if (!currentUser || !currentUser.email) {
          this.error = 'No user data available. Please log in again.';
          return;
        }

        const deleteData = {
          email: currentUser.email,
          password: prompt('Please enter your password to confirm account deletion:')
        };

        if (!deleteData.password) {
          return;
        }

        const response = await this.http.request('DELETE', 'https://localhost:44399/api/auth/account', {
          body: deleteData,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true
        }).toPromise();

        if (response) {
          // Clear local storage and redirect to login
          localStorage.removeItem('userEmail');
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        } else {
          throw new Error('Failed to delete account');
        }
      } catch (error: any) {
        console.error('Error deleting account:', error);
        if (error.status === 200) {
          // If the status is 200, the deletion was successful
          localStorage.removeItem('userEmail');
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        } else {
          this.error = error.error?.Message || error.message || 'Failed to delete account. Please try again.';
        }
      }
    }
  }

  // Reset Password
  async resetPassword() {
    if (this.resetPasswordForm.valid) {
      try {
        const currentUser = this.authService.getUserData();
        if (!currentUser || !currentUser.email) {
          this.error = 'No user data available. Please log in again.';
          return;
        }

        const resetData = {
          email: currentUser.email,
          currentPassword: this.resetPasswordForm.value.currentPassword,
          newPassword: this.resetPasswordForm.value.newPassword,
          confirmPassword: this.resetPasswordForm.value.confirmNewPassword
        };

        console.log('Sending password reset request with data:', {
          email: resetData.email
        });

        const response = await this.http.post<any>(
          'https://localhost:44399/api/auth/reset-password-logged-in',
          resetData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            withCredentials: true
          }
        ).toPromise();

        console.log('Password reset response:', response);

        if (response && (response.Message || response.message)) {
          alert(response.Message || response.message);
          if (response.ShouldLogout || response.shouldLogout) {
            // Clear user data and navigate to login
            this.authService.logout();
            this.router.navigate(['/auth/login']);
          }
          this.resetPasswordForm.reset();
          this.error = null;
        } else {
          throw new Error(response?.message || response?.Message || 'Failed to reset password');
        }
      } catch (error: any) {
        console.error('Error resetting password:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error response:', error.error);
        this.error = error.error?.message || error.error?.Message || error.message || 'Failed to reset password. Please try again.';
      }
    } else {
      this.resetPasswordForm.markAllAsTouched();
      this.error = 'Please fill in all required fields correctly.';
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