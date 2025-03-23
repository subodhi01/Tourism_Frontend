import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf'; // For PDF generation
import { saveAs } from 'file-saver'; // For file saving

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

  // Loading and success states
  isLoading: boolean = false;
  isSuccess: boolean = false;

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

  // Generate PDF Report
  generatePDFReport(formData: any) {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Booking Request Report', 10, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${formData.name}`, 10, 30);
    doc.text(`Dates: ${formData.dates}`, 10, 40);
    doc.text(`Number of People: ${formData.numberOfPeople}`, 10, 50);
    doc.text(`Description: ${formData.description}`, 10, 60);
    doc.text(`Event Type: ${formData.eventType}`, 10, 70);
    if (formData.eventType === 'custom') {
      doc.text(`Custom Event Description: ${formData.customEventDescription}`, 10, 80);
    }
    doc.save('booking_request_report.pdf'); // Save the PDF
  }

  // Generate CSV Report
  generateCSVReport(formData: any) {
    const csvContent = [
      ['Field', 'Value'],
      ['Name', formData.name],
      ['Dates', formData.dates],
      ['Number of People', formData.numberOfPeople],
      ['Description', formData.description],
      ['Event Type', formData.eventType],
      ['Custom Event Description', formData.eventType === 'custom' ? formData.customEventDescription : 'N/A']
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'booking_request_report.csv'); // Save the CSV
  }

  // Handle form submission
  onSubmit() {
    if (!this.isFormValid()) {
      alert('Please fill out all fields correctly.');
      return;
    }

    // Set loading state
    this.isLoading = true;
    this.isSuccess = false;

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
    alert('Booking request submitted successfully!');

    // Simulate a delay for report generation
    setTimeout(() => {
      // Generate and download the PDF report
      this.generatePDFReport(formData);

      // Generate and download the CSV report
      this.generateCSVReport(formData);

      // Set success state
      this.isLoading = false;
      this.isSuccess = true;

      // Reset success message after 5 seconds
      setTimeout(() => {
        this.isSuccess = false;
      }, 5000);
    }, 2000); // Simulate a 2-second delay
  }
}
