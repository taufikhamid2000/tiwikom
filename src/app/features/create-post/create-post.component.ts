import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { DepartmentService } from '../../core/services/department.service';
import { AuthService } from '../../core/services/auth.service';
import { Post } from '../../core/models/post.model';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  departments: any[] = [];
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private departmentService: DepartmentService,
    private authService: AuthService,
    private router: Router
  ) {
    this.createPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      departmentId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Load departments
    this.departments = this.departmentService.getDepartments();
  }

  get titleControl() {
    return this.createPostForm.get('title');
  }

  get contentControl() {
    return this.createPostForm.get('content');
  }

  get departmentControl() {
    return this.createPostForm.get('departmentId');
  }

  onSubmit(): void {
    if (this.createPostForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';

      try {
        const currentUser = this.authService.getCurrentUser();
        const selectedDepartment = this.departments.find(d => d.departmentId === this.createPostForm.value.departmentId);
        
        const newPost: Post = {
          postId: this.generateId(),
          title: this.createPostForm.value.title.trim(),
          content: this.createPostForm.value.content.trim(),
          userId: currentUser?.userId || 'anonymous',
          userName: currentUser?.fullName || 'Anonymous User',
          departmentName: selectedDepartment?.name || 'Unknown Department',
          createdAt: new Date().toISOString(),
          likes: 0,
          comments: []
        };

        // Add the post
        this.postService.createPost(newPost);

        // Navigate back to post list
        this.router.navigate(['/post-list']);
      } catch (error) {
        this.errorMessage = 'Failed to create post. Please try again.';
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to show validation errors
      this.createPostForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/post-list']);
  }

  private generateId(): string {
    return 'post_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Validation helper methods
  isFieldInvalid(fieldName: string): boolean {
    const field = this.createPostForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.createPostForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldDisplayName(fieldName)} cannot exceed ${field.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      'title': 'Title',
      'content': 'Content',
      'departmentId': 'Department'
    };
    return displayNames[fieldName] || fieldName;
  }

  // Character count helpers
  getTitleCharCount(): number {
    return this.createPostForm.get('title')?.value?.length || 0;
  }

  getContentCharCount(): number {
    return this.createPostForm.get('content')?.value?.length || 0;
  }
}