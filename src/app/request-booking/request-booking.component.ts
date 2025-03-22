import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-booking.component.html',
  styleUrls: ['./request-booking.component.scss']
})
export class RequestBookingComponent {
  // Form fields
  name: string = '';
  dates: string = '';
  numberOfPeople: number = 1;
  description: string = '';
  eventType: string = 'dayout';
  customEventDescription: string = '';
  agreePrivacyPolicy: boolean = false;
  agreePaymentMethod: boolean = false;

  // Event types for dropdown
  eventTypes = [
    { value: 'dayout', label: 'Day Out' },
    { value: 'night', label: 'Night Stay' },
    { value: 'bbq', label: 'BBQ Party' },
    { value: 'custom', label: 'Customize' }
  ];

  // Get today's date in YYYY-MM-DD format
  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Get the minimum date (one week from today)
  get minDate(): string {
    const today = new Date();
    const oneWeekLater = new Date(today.setDate(today.getDate() + 7));
    return oneWeekLater.toISOString().split('T')[0];
  }

  // Validate name (no numbers allowed)
  validateName(): boolean {
    return /^[A-Za-z\s]+$/.test(this.name);
  }

  // Validate number of people (must be positive and <= 50)
  validateNumberOfPeople(): boolean {
    return this.numberOfPeople > 0 && this.numberOfPeople <= 50;
  }

  // Validate date (must be at least one week from today)
  validateDate(): boolean {
    const selectedDate = new Date(this.dates);
    const today = new Date();
    const oneWeekLater = new Date(today.setDate(today.getDate() + 7));
    return selectedDate >= oneWeekLater;
  }

  // Check if the form is valid
  isFormValid(): boolean {
    return (
      this.name.trim() !== '' &&
      this.validateName() &&
      this.dates !== '' &&
      this.validateDate() &&
      this.numberOfPeople > 0 &&
      this.validateNumberOfPeople() &&
      this.description.trim() !== '' &&
      (this.eventType !== 'custom' || this.customEventDescription.trim() !== '') &&
      this.agreePrivacyPolicy &&
      this.agreePaymentMethod
    );
  }

  // Handle input change for number of people
  onNumberOfPeopleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);

    if (value > 50) {
      input.value = '50'; // Reset the input value to 50
      this.numberOfPeople = 50; // Update the model
    }
  }

  // Handle form submission
  onSubmit() {
    if (!this.isFormValid()) {
      alert('Please fill out all fields correctly.');
      return;
    }

    // Dummy success message
    alert('Successfully booked!');

    // Log form data (for debugging purposes)
    const formData = {
      name: this.name,
      dates: this.dates,
      numberOfPeople: this.numberOfPeople,
      description: this.description,
      eventType: this.eventType,
      customEventDescription: this.customEventDescription,
      agreePrivacyPolicy: this.agreePrivacyPolicy,
      agreePaymentMethod: this.agreePaymentMethod
    };
    console.log('Form Data:', formData);
  }
}
