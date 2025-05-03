import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelPlaceService } from '../../services/travel-place.service';
import { TravelPlace } from '../../models/travel-place.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-travel-destination',
  templateUrl: './travel-destination.component.html',
  styleUrls: ['./travel-destination.component.scss'],
  imports: [CommonModule]
})
export class TravelDestinationComponent implements OnInit {
  travelPlaces: TravelPlace[] = [];
  selectedPlace: TravelPlace | null = null;
  errorMessage: string | null = null;

  constructor(private travelPlaceService: TravelPlaceService) {}

  ngOnInit(): void {
    this.loadTravelPlaces();
  }

  loadTravelPlaces(): void {
    this.travelPlaceService.getAllTravelPlaces().subscribe({
      next: (places: TravelPlace[]) => {
        console.log('Received places:', places);
        this.travelPlaces = places;
        this.errorMessage = null;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching travel places:', {
          status: err.status,
          statusText: err.statusText,
          message: err.message,
          error: err.error
        });
        this.errorMessage = 'Failed to load travel places. Please try again later.';
      },
      complete: () => {
        console.log('API call completed');
      }
    });
  }

  showDetails(place: TravelPlace): void {
    this.selectedPlace = place;
  }

  sendRequest(place: TravelPlace): void {
    alert(`Request sent for ${place.placeName}`);
  }

  closeDetails(): void {
    this.selectedPlace = null;
  }
}
