import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  getPlaces() {
    return [
      {
        id: 1,
        name: 'D1 - Unawatuna Beach Resort',
        images: ['assets/images/image1.jpg', 'assets/images/image1.jpg', 'assets/images/image1.jpg'],
        description: 'A beautiful beach resort with water sports and dining.',
        rating: 4.5,
        availability: ['2023-10-15', '2023-10-16', '2023-10-17'],
        location: 'Unawatuna, Galle'
      },
      {
        id: 2,
        name: 'D2 - Jungle Adventures',
        images: ['assets/images/image1.jpg', 'assets/images/image1.jpg', 'assets/images/image1.jpg'],
        description: 'Explore the jungle with guided tours and zip-lining.',
        rating: 4.8,
        availability: ['2023-10-18', '2023-10-19'],
        location: 'Hiyare, Galle'
      },
      {
        id: 3,
        name: 'D2 - Jungle Adventures',
        images: ['assets/images/image1.jpg', 'assets/images/image1.jpg', 'assets/images/image1.jpg'],
        description: 'Explore the jungle with guided tours and zip-lining.',
        rating: 4.8,
        availability: ['2023-10-18', '2023-10-19'],
        location: 'Hiyare, Galle'
      },
      {
        id: 4,
        name: 'D2 - Jungle Adventures',
        images: ['assets/images/image1.jpg', 'assets/images/image1.jpg', 'assets/images/image1.jpg'],
        description: 'Explore the jungle with guided tours and zip-lining.',
        rating: 4.8,
        availability: ['2023-10-18', '2023-10-19'],
        location: 'Hiyare, Galle'
      },
      {
        id: 5,
        name: 'D2 - Jungle Adventures',
        images: ['assets/images/image1.jpg', 'assets/images/image1.jpg', 'assets/images/image1.jpg'],
        description: 'Explore the jungle with guided tours and zip-lining.',
        rating: 4.8,
        availability: ['2023-10-18', '2023-10-19'],
        location: 'Hiyare, Galle'
      },
      // Add more dummy data for D3 to D11...
    ];
  }
}
