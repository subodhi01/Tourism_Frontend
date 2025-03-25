import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})

export class ConfirmDialogComponent {
  @Input() isOpen: boolean = false;  // Controls visibility of the dialog
  @Input() message: string = '';     // Custom message for confirmation
  @Output() closed = new EventEmitter<boolean>();  // Emits user’s choice (true for Yes, false for No)

  onNoClick(): void {
    this.closed.emit(false);  // Emit false when "No" is clicked
  }

  onYesClick(): void {
    this.closed.emit(true);   // Emit true when "Yes" is clicked
  }

  onOverlayClick(): void {
    this.closed.emit(false);  // Emit false when overlay is clicked to close
  }
}