import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { Post } from '../../../core/models/post.model';

@Component({
  selector: 'app-manage-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.scss']
})
export class ManagePostsComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchQuery = '';
  sortBy: 'newest' | 'oldest' | 'mostLikes' | 'mostComments' = 'newest';
  selectedPosts: Set<string> = new Set();
  showDeleteConfirm = false;
  deletePostId: string | null = null;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
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
  }

  onSearchChange(): void {
    this.applyFiltersAndSort();
  }

  onSortChange(): void {
    this.applyFiltersAndSort();
  }

  toggleSelectPost(postId: string): void {
    if (this.selectedPosts.has(postId)) {
      this.selectedPosts.delete(postId);
    } else {
      this.selectedPosts.add(postId);
    }
  }

  selectAll(): void {
    if (this.selectedPosts.size === this.filteredPosts.length) {
      this.selectedPosts.clear();
    } else {
      this.filteredPosts.forEach(post => this.selectedPosts.add(post.postId));
    }
  }

  isPostSelected(postId: string): boolean {
    return this.selectedPosts.has(postId);
  }

  isAllSelected(): boolean {
    return this.filteredPosts.length > 0 && this.selectedPosts.size === this.filteredPosts.length;
  }

  openDeleteConfirm(postId: string): void {
    this.deletePostId = postId;
    this.showDeleteConfirm = true;
  }

  closeDeleteConfirm(): void {
    this.showDeleteConfirm = false;
    this.deletePostId = null;
  }

  confirmDelete(): void {
    if (this.deletePostId) {
      this.postService.softDeletePost(this.deletePostId);
      this.selectedPosts.delete(this.deletePostId);
      this.loadPosts();
      this.closeDeleteConfirm();
    }
  }

  deleteSelectedPosts(): void {
    if (this.selectedPosts.size === 0) return;

    const confirmDelete = confirm(
      `Are you sure you want to delete ${this.selectedPosts.size} post(s)? This action cannot be undone.`
    );

    if (confirmDelete) {
      this.selectedPosts.forEach(postId => {
        this.postService.softDeletePost(postId);
      });
      this.selectedPosts.clear();
      this.loadPosts();
    }
  }

  editPost(postId: string): void {
    const post = this.postService.getPostById(postId);
    if (post) {
      // Navigate to create-post with edit mode
      this.router.navigate(['/create-post'], { queryParams: { id: postId, edit: true } });
    }
  }

  viewPost(postId: string): void {
    this.router.navigate(['/post', postId]);
  }

  formatDate(date: string | Date): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
