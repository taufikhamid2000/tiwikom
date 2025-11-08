import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { Post } from '../../core/models/post.model';
import { LikeButtonComponent } from '../../shared/like-button/like-button.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf, NgFor, DatePipe, LikeButtonComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  currentUserId: string | null = null;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.currentUserId = currentUser?.userId || null;
    this.loadPosts();
  }

  private loadPosts(): void {
    this.posts = this.postService.getPosts();
  }

  ionViewWillEnter(): void {
    this.loadPosts();
  }

  isPostOwner(post: Post): boolean {
    return post.userId === this.currentUserId;
  }

  editPost(postId: string): void {
    const post = this.posts.find(p => p.postId === postId);
    if (post && this.isPostOwner(post)) {
      this.router.navigate(['/create-post'], { queryParams: { id: postId, edit: true } });
    }
  }
}
