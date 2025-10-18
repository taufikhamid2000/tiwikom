import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { mockPosts } from '../../mock-data/mock-posts';
import { LikeButtonComponent } from '../../shared/like-button/like-button.component';

@Component({
  selector: 'app-post-list',
  standalone: true, // ✅ mark as standalone
  imports: [CommonModule, RouterModule, NgIf, NgFor, DatePipe, LikeButtonComponent], // ✅ add these
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts = mockPosts;

  ngOnInit(): void {
    // simulate loading delay if needed later
  }
}
