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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Ensures it's only executed in the browser
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => this.showSlides(), 1000); // Delay to allow the page to load
    }
  }

  showSlides() {
    if (!this.isBrowser) return;

    let slides = document.getElementsByClassName("slide") as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; // Hide all slides initially
    }

    this.slideIndex++;
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1; // Reset the slide index to loop back
    }

    slides[this.slideIndex - 1].style.display = "block"; // Show the current slide

    setTimeout(() => this.showSlides(), 3000); // Change image every 3 seconds
  }
}
