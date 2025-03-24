import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Destination {
  name: string;
  description: string;
  image: string;
}

interface Testimonial {
  text: string;
  authorName: string;
  authorLocation: string;
  authorImage: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class HomeComponent implements OnInit {
  newsletterForm: FormGroup;

  popularDestinations: Destination[] = [
    {
      name: 'Galle Fort',
      description: 'Historic 16th-century fort with stunning ocean views',
      image: '../../../assets/images/Galle-Lighthouse.jpg'
    },
    {
      name: 'Unawatuna Beach',
      description: 'Pristine beach with crystal clear waters',
      image: '../../../assets/images/image5.jpg'
    },
    {
      name: 'Jungle Beach',
      description: 'Secluded beach surrounded by lush greenery',
      image: '../../../assets/images/image4.jpg'
    }
  ];

  testimonials: Testimonial[] = [
    {
      text: 'The guided tour of Galle Fort was absolutely incredible. Our guide was knowledgeable and made history come alive!',
      authorName: 'Sarah Johnson',
      authorLocation: 'United Kingdom',
      authorImage: '../../../assets/images/u1.jpg'
    },
    {
      text: 'The local cuisine experience was unforgettable. We got to try authentic Sri Lankan dishes and learn about their preparation.',
      authorName: 'Michael Chen',
      authorLocation: 'Singapore',
      authorImage: '../../../assets/images/u2.jpg'
    },
    {
      text: 'The luxury accommodations exceeded our expectations. The ocean view from our room was breathtaking.',
      authorName: 'Emma Davis',
      authorLocation: 'Australia',
      authorImage: '../../../assets/images/u3.jpg'
    }
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Initialize any required functionality
  }

  // Navigation methods
  onExploreNow(): void {
    this.router.navigate(['/destinations']);
  }

  onWatchVideo(): void {
    // Implement video modal or navigation
    console.log('Watch video clicked');
  }

  // Newsletter subscription handler
  onSubmitNewsletter(event: Event): void {
    event.preventDefault();
    if (this.newsletterForm.valid) {
      const email = this.newsletterForm.get('email')?.value;
      // Add newsletter subscription logic here
      console.log('Newsletter subscription submitted for:', email);
      this.newsletterForm.reset();
    }
  }
}
