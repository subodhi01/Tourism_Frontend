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

export class HomeComponent implements AfterViewInit {
  slideIndex = 0;
  isBrowser: boolean;
  private slideInterval: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      // Use a slightly longer delay to ensure DOM is fully loaded
      setTimeout(() => this.showSlides(), 1500);
    }

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
      image: '../../../assets/images/image2.jpg'
    },
    {
      name: 'Jungle Beach',
      description: 'Secluded beach surrounded by lush greenery',
      image: '../../../assets/images/image2.jpg'
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


    try {
      const slides = document.getElementsByClassName("slide") as HTMLCollectionOf<HTMLElement>;
      
      if (!slides || slides.length === 0) {
        console.warn('No slides found in the DOM');
        return;
      }

      // Hide all slides
      for (let i = 0; i < slides.length; i++) {
        if (slides[i]) {
          slides[i].style.display = "none";
        }
      }

      this.slideIndex++;
      if (this.slideIndex > slides.length) {
        this.slideIndex = 1;
      }

      // Show current slide
      const currentSlide = slides[this.slideIndex - 1];
      if (currentSlide) {
        currentSlide.style.display = "block";
      }

      // Clear any existing interval before setting a new one
      if (this.slideInterval) {
        clearInterval(this.slideInterval);
      }

      // Set new interval
      this.slideInterval = setInterval(() => this.showSlides(), 3000);
    } catch (error) {
      console.error('Error in showSlides:', error);
    }
  }

  ngOnDestroy() {
    // Clear the interval when component is destroyed
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
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
