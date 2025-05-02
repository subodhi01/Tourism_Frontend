import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="contact-form-container">
      <h2>Contact Us</h2>
      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" formControlName="name" class="form-control">
          <div *ngIf="contactForm.get('name')?.errors?.['required'] && contactForm.get('name')?.touched" class="error-message">
            Name is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email" class="form-control">
          <div *ngIf="contactForm.get('email')?.errors?.['required'] && contactForm.get('email')?.touched" class="error-message">
            Email is required
          </div>
          <div *ngIf="contactForm.get('email')?.errors?.['email'] && contactForm.get('email')?.touched" class="error-message">
            Please enter a valid email
          </div>
        </div>

        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" id="subject" formControlName="subject" class="form-control">
          <div *ngIf="contactForm.get('subject')?.errors?.['required'] && contactForm.get('subject')?.touched" class="error-message">
            Subject is required
          </div>
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" formControlName="message" class="form-control" rows="5"></textarea>
          <div *ngIf="contactForm.get('message')?.errors?.['required'] && contactForm.get('message')?.touched" class="error-message">
            Message is required
          </div>
        </div>

        <button type="submit" [disabled]="contactForm.invalid || isSubmitting" class="submit-button">
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>

        <div *ngIf="submitStatus" [ngClass]="{'success-message': submitStatus === 'success', 'error-message': submitStatus === 'error'}" class="status-message">
          {{ submitStatus === 'success' ? 'Message sent successfully!' : 'Failed to send message. Please try again.' }}
        </div>
      </form>
    </div>
  `,
  styles: [`
    .contact-form-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    textarea.form-control {
      resize: vertical;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .submit-button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .submit-button:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .submit-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .status-message {
      margin-top: 1rem;
      padding: 0.75rem;
      border-radius: 4px;
      text-align: center;
    }

    .success-message {
      background-color: #d4edda;
      color: #155724;
    }

    .error-message {
      background-color: #f8d7da;
      color: #721c24;
    }
  `]
})
export class ContactFormComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitStatus: 'success' | 'error' | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitStatus = null;

      const contact: Contact = this.contactForm.value;

      this.contactService.addContact(contact).subscribe({
        next: () => {
          this.submitStatus = 'success';
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error submitting contact form:', error);
          this.submitStatus = 'error';
          this.isSubmitting = false;
        }
      });
    }
  }
} 