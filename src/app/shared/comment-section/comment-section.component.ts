import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent {
  @Input() comments: { author: string; content: string; date: Date }[] = [];

  newComment = '';

  addComment() {
    if (!this.newComment.trim()) return;

    this.comments.unshift({
      author: 'Anonymous',
      content: this.newComment.trim(),
      date: new Date()
    });

    this.newComment = '';
  }
}
