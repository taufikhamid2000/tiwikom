import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { Post } from '../../core/models/post.model';
import { LikeButtonComponent } from '../../shared/like-button/like-button.component';
import { PostFilterComponent, PostFilterOptions, PaginationOptions } from '../../shared/post-filter/post-filter.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf, NgFor, DatePipe, LikeButtonComponent, PostFilterComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  paginatedPosts: Post[] = [];
  currentUserId: string | null = null;
  searchQuery = '';
  sortBy: 'newest' | 'oldest' | 'mostLikes' | 'mostComments' = 'newest';
  pageSize = 5;
  currentPage = 1;

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
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort(): void {
    let filtered = [...this.posts];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.userName.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (this.sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'mostLikes':
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case 'mostComments':
        filtered.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    this.filteredPosts = filtered;
    this.updatePaginatedPosts();
  }

  updatePaginatedPosts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPosts = this.filteredPosts.slice(startIndex, endIndex);
  }

  onFilterChange(options: PostFilterOptions): void {
    this.searchQuery = options.searchQuery;
    this.sortBy = options.sortBy;
    this.currentPage = 1;
    this.applyFiltersAndSort();
  }

  onPageChange(options: PaginationOptions): void {
    this.pageSize = options.pageSize;
    this.currentPage = options.currentPage;
    this.updatePaginatedPosts();
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
      this.router.navigate(['/edit-post', postId]);
    }
  }
}
