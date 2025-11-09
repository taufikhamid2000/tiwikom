import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PostFilterOptions {
  searchQuery: string;
  sortBy: 'newest' | 'oldest' | 'mostLikes' | 'mostComments';
}

export interface PaginationOptions {
  pageSize: number;
  currentPage: number;
}

@Component({
  selector: 'app-post-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-filter.component.html',
  styleUrls: ['./post-filter.component.scss']
})
export class PostFilterComponent {
  @Input() searchQuery = '';
  @Input() sortBy: 'newest' | 'oldest' | 'mostLikes' | 'mostComments' = 'newest';
  @Input() placeholder = 'Search posts by title, content, or author...';
  @Input() pageSize = 5;
  @Input() currentPage = 1;
  @Input() totalItems = 0;
  @Output() filterChange = new EventEmitter<PostFilterOptions>();
  @Output() pageChange = new EventEmitter<PaginationOptions>();

  sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'mostLikes', label: 'Most Likes' },
    { value: 'mostComments', label: 'Most Comments' }
  ];

  pageSizeOptions = [5, 10, 15, 20];

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get paginationInfo(): string {
    const startItem = (this.currentPage - 1) * this.pageSize + 1;
    const endItem = Math.min(this.currentPage * this.pageSize, this.totalItems);
    return `${startItem}-${endItem} of ${this.totalItems}`;
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.emitFilterChange();
  }

  onSortChange(): void {
    this.currentPage = 1;
    this.emitFilterChange();
  }

  onSearchClear(): void {
    this.searchQuery = '';
    this.currentPage = 1;
    this.emitFilterChange();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.emitPageChange();
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitPageChange();
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.emitPageChange();
    }
  }

  onPageInputChange(): void {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.emitPageChange();
  }

  private emitFilterChange(): void {
    this.filterChange.emit({
      searchQuery: this.searchQuery,
      sortBy: this.sortBy
    });
  }

  private emitPageChange(): void {
    this.pageChange.emit({
      pageSize: this.pageSize,
      currentPage: this.currentPage
    });
  }
}
