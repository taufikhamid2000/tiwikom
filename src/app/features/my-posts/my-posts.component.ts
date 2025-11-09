import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { PostFilterComponent, PostFilterOptions, PaginationOptions } from '../../shared/post-filter/post-filter.component';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [CommonModule, RouterLink, PostFilterComponent],
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  userPosts: any[] = [];
  filteredPosts: any[] = [];
  paginatedPosts: any[] = [];
  currentUserId = '';
  isLoading = true;
  selectedPost: any = null;
  showDeleteConfirm = false;
  postToDelete: any = null;
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
    if (currentUser) {
      this.currentUserId = currentUser.userId;
      this.loadUserPosts();
    }
    this.isLoading = false;
  }

  loadUserPosts(): void {
    const allPosts = this.postService.getPosts();
    this.userPosts = allPosts.filter(post => post.userId === this.currentUserId);
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort(): void {
    let filtered = [...this.userPosts];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
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

  selectPost(post: any): void {
    this.selectedPost = this.selectedPost?.postId === post.postId ? null : post;
  }

  editPost(post: any): void {
    // Navigate to edit-post with post ID
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
