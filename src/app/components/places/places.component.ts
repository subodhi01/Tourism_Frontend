import { Component, AfterViewInit, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PlacesService } from '../../services/places.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, AfterViewInit {
  places: any[] = [];

  constructor(
    private placesService: PlacesService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to check environment
  ) {}

  ngOnInit(): void {
    this.places = this.placesService.getPlaces();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // This runs only in the browser, preventing SSR errors
      document.querySelectorAll('.carousel').forEach(carousel => {
        new bootstrap.Carousel(carousel);
      });
    }
  }
}
