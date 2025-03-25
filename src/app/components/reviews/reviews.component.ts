import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService, Review } from '../../services/review.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DummySessionService } from '../../services/dummy-session.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReviewFormComponent,
    ConfirmDialogComponent
  ],
  providers: [DummySessionService], 
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})

export class ReviewsComponent implements OnInit {
  type: 'tour' | 'hotel' | 'activity';
  itemId: number;
  reviews: Review[] = [];
  isReviewFormOpen: boolean = false;
  selectedReview: Review | null = null;
  isConfirmDialogOpen: boolean = false;
  reviewToDelete: number | null = null;
  sessionEmail: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private dummySessionService: DummySessionService
  ) {
    this.type = (this.route.snapshot.paramMap.get('type') as 'tour' | 'hotel' | 'activity') || 'tour';
    this.itemId = Number(this.route.snapshot.paramMap.get('itemId')) || 0;
  }

  ngOnInit() {
    if (this.dummySessionService) {
      this.sessionEmail = this.dummySessionService.getCurrentEmail();
    } else {
      console.error('DummySessionService is not injected');
      this.sessionEmail = null;
    }
    this.loadReviews();
  }

  loadReviews() {
    this.reviewService.getReviews(this.type, this.itemId)
      .subscribe({
        next: (reviews) => {
          this.reviews = reviews;
          console.log('Reviews loaded:', reviews);
        },
        error: (err) => console.error('Error loading reviews:', err)
      });
  }

  openReviewForm(review: Review | null) {
    this.selectedReview = review;
    this.isReviewFormOpen = true;
  }

  closeReviewForm() {
    this.isReviewFormOpen = false;
    this.selectedReview = null;
  }

  onReviewFormSubmit(formData: Omit<Review, 'id' | 'date'>) {
    if (this.selectedReview) {
      if (this.selectedReview.id === undefined) {
        console.error('Selected review must have a valid id for updating.');
        return;
      }
      const updatedReview: Partial<Review> = {
        email: formData.email,
        rating: formData.rating,
        comment: formData.comment,
        type: formData.type,
        itemId: formData.itemId
      };
      this.reviewService.updateReview(this.selectedReview.id, updatedReview)
        .subscribe({
          next: () => {
            console.log('Review updated successfully');
            this.loadReviews();
          },
          error: (err) => console.error('Error updating review:', err)
        });
    } else {
      console.log('Submitting new review:', formData);
      this.reviewService.addReview(formData)
        .subscribe({
          next: (response) => {
            console.log('Review added successfully:', response);
            this.loadReviews();
          },
          error: (err) => console.error('Error adding review:', err)
        });
    }
    this.closeReviewForm();
  }

  openConfirmDialog(reviewId: number) {
    this.reviewToDelete = reviewId;
    this.isConfirmDialogOpen = true;
  }

  onConfirmDialogClosed(confirmed: boolean) {
    if (confirmed && this.reviewToDelete !== null) {
      this.reviewService.deleteReview(this.reviewToDelete)
        .subscribe({
          next: () => {
            console.log('Review deleted successfully');
            this.loadReviews();
          },
          error: (err) => console.error('Error deleting review:', err)
        });
    }
    this.isConfirmDialogOpen = false;
    this.reviewToDelete = null;
  }
}