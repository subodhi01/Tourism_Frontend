import { Component, AfterViewInit, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PlacesService } from '../../services/places.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

declare var bootstrap: any;

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, AfterViewInit {
  places: any[] = [];
  selectedLocation: string = '';
  locations: string[] = [];
  isLoading: boolean = false;

  constructor(
    private placesService: PlacesService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadAllPlaces();
  }

  loadAllPlaces(): void {
    this.isLoading = true;
    this.placesService.getAllPlaces().subscribe({
      next: (data) => {
        this.places = data;
        this.locations = [...new Set(data.map(place => place.location))];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading places:', error);
        this.isLoading = false;
      }
    });
  }

  onLocationChange(): void {
    if (this.selectedLocation) {
      this.isLoading = true;
      this.placesService.getPlacesByLocation(this.selectedLocation).subscribe({
        next: (data) => {
          this.places = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error filtering places:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.loadAllPlaces();
    }
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
