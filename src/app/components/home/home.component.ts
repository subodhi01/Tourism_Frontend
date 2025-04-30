import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
  }

  showSlides() {
    if (!this.isBrowser) return;

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
  }
}
