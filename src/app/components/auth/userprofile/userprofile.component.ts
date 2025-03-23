


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserProfileComponent {
  profileForm: FormGroup;
  resetPasswordForm: FormGroup;
  editMode = false;
  profilePicture: string | null = null;
  availablePreferences = ['Hiking', 'Surfing', 'Natural Environment', 'Camping', 'Sightseeing']; // Add more as needed

  // Mock user data (replace with actual data from your backend)
  user = {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    telephone: '1234567890',
    budget: 500,
    preferences: ['Hiking', 'Natural Environment']
  };

  constructor(private fb: FormBuilder) {
    // Profile Form with dynamic controls for preferences
    const preferenceControls = this.availablePreferences.reduce((acc, pref) => {
      acc[pref] = [this.user.preferences.includes(pref)];
      return acc;
    }, {} as { [key: string]: any });

    this.profileForm = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      telephone: [this.user.telephone, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      budget: [this.user.budget, [Validators.min(0)]],
      ...preferenceControls
    });

    // Reset Password Form
    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
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
  saveProfile() {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;
      this.user = {
        username: formValue.username,
        email: formValue.email,
        telephone: formValue.telephone,
        budget: formValue.budget,
        preferences: this.availablePreferences.filter(pref => formValue[pref])
      };
      console.log('Profile updated:', this.user);
      // Add API call to save profile data here
      this.editMode = false;
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  // Delete Profile
  deleteProfile() {
    if (confirm('Are you sure you want to delete your profile?')) {
      console.log('Profile deleted');
      // Add API call to delete profile here
    }
  }

  // Reset Password
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      console.log('Password reset:', this.resetPasswordForm.value);
      // Add API call to reset password here
      this.resetPasswordForm.reset();
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