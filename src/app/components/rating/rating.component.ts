import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})

export class RatingComponent {
  @Input() rating: number = 0; // Current rating value
  @Output() ratingChange = new EventEmitter<number>(); // Emits rating changes
  stars = [1, 2, 3, 4, 5]; // Array for 5 stars

  rate(value: number) {
    this.rating = value;
    this.ratingChange.emit(value);
  }
}