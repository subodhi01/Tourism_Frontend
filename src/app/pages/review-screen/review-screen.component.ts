import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DummySessionService } from '../../services/dummy-session.service';
import { Review, ReviewService } from '../../services/review.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-review-screen',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './review-screen.component.html',
  styleUrls: ['./review-screen.component.scss']
})

export class ReviewScreenComponent implements OnInit {
  emails: string[] = [];
  types: string[] = ['tour', 'hotel', 'activity']; // Hardcoded as per Review interface
  typeItemMap: { [key: string]: number[] } = {};
  itemIds: number[] = [];
  selectedEmail: string = '';
  selectedType: string = '';
  selectedItemId: number | null = null;

  constructor(
    private reviewService: ReviewService,
    private sessionService: DummySessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reviewService.getAllReviews().subscribe({
      next: (reviews: Review[]) => {
        // Filter reviews to only include valid types
        const validReviews = reviews.filter(review => 
          ['tour', 'hotel', 'activity'].includes(review.type)
        );

        // Extract unique emails
        this.emails = [...new Set(validReviews.map(review => review.email))];

        // Build type-to-itemId mapping for valid types
        this.types.forEach(type => {
          const itemIds = validReviews
            .filter(review => review.type === type)
            .map(review => review.itemId);
          this.typeItemMap[type] = [...new Set(itemIds)];
        });
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
      }
    });
  }

  onTypeChange(): void {
    this.itemIds = this.typeItemMap[this.selectedType] || [];
    this.selectedItemId = null; // Reset itemId when type changes
  }

  onEmailChange(): void {
    console.log('Selected email changed to:', this.selectedEmail);
  }

  continue(): void {
    if (this.selectedEmail && this.selectedType && this.selectedItemId != null) {
      this.sessionService.setCurrentEmail(this.selectedEmail);
      this.router.navigate([`/reviews/${this.selectedType}/${this.selectedItemId}`]);
    }
  }
}