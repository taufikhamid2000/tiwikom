import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  userPosts: any[] = [];
  currentUserId = '';
  isLoading = true;
  selectedPost: any = null;
  showDeleteConfirm = false;
  postToDelete: any = null;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUserId = currentUser.userId;
      this.loadUserPosts();
    }
    this.isLoading = false;
  }

  loadUserPosts(): void {
    const allPosts = this.postService.getPosts();
    this.userPosts = allPosts.filter(post => post.userId === this.currentUserId);
  }

  selectPost(post: any): void {
    this.selectedPost = this.selectedPost?.postId === post.postId ? null : post;
  }

  editPost(post: any): void {
    // Navigate to edit page (will create later)
    this.router.navigate(['/edit-post', post.postId]);
  }

  confirmDelete(post: any): void {
    this.postToDelete = post;
    this.showDeleteConfirm = true;
  }

  deletePost(): void {
    if (this.postToDelete) {
      this.postService.deletePost(this.postToDelete.postId);
      this.loadUserPosts();
      this.showDeleteConfirm = false;
      this.postToDelete = null;
      this.selectedPost = null;
    }
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.postToDelete = null;
  }

  formatDate(date: string): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  goToPost(postId: string): void {
    this.router.navigate(['/post', postId]);
  }
}
