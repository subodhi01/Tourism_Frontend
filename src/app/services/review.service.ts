import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  id: number;
  email: string;  // Changed from userName to match backend
  rating: number;
  comment: string;
  type: 'tour' | 'hotel' | 'activity';
  itemId: number;
  date: string;  // Will be handled as ISO string from backend
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  private apiUrl = 'http://localhost:5136/api/reviews'; // Adjust URL based on your backend port

  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}`);
  }

  getReviews(type: string, itemId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/item/${itemId}`);
  }

  addReview(review: Omit<Review, 'id' | 'date'>): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  updateReview(id: number, review: Partial<Review>): Observable<Review> {
    return this.http.put<Review>(`${this.apiUrl}/${id}`, review);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}