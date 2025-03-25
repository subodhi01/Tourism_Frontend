import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RatingComponent } from '../rating/rating.component';
import { Validators } from '@angular/forms';
import { Review } from '../../services/review.service';  // Import from service

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RatingComponent],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() reviewToEdit: Review | null = null;
  @Input() type: 'tour' | 'hotel' | 'activity' | null = null;
  @Input() itemId: number | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<Omit<Review, 'id' | 'date'>>();  // Emit correct type

  reviewForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required],
      type: ['', Validators.required],
      itemId: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reviewToEdit'] || changes['isOpen']) {
      this.updateForm();
    }
  }

  private updateForm() {
    if (this.isOpen && this.reviewToEdit) {
      this.reviewForm.patchValue({
        email: this.reviewToEdit.email,
        rating: this.reviewToEdit.rating,
        comment: this.reviewToEdit.comment,
        type: this.reviewToEdit.type,
        itemId: this.reviewToEdit.itemId
      });
    } else if (this.isOpen) {
      this.reviewForm.reset({
        email: '',
        rating: 1,
        comment: '',
        type: this.type || 'tour',
        itemId: this.itemId || 0
      });
    }
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const formValue = this.reviewForm.value as Omit<Review, 'id' | 'date'>;
      this.submit.emit(formValue);
      this.close.emit();
    }
  }

  onClose() {
    this.close.emit();
  }
}