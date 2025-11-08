import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  isEditMode = false;
  editPostId: string | null = null;
  currentPost: Post | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private departmentService: DepartmentService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      departmentId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.departments = this.departmentService.getDepartments();

    this.route.queryParams.subscribe(params => {
      if (params['id'] && params['edit'] === 'true') {
        this.editPostId = params['id'];
        this.loadPostForEdit();
      }
    });
  }

  loadPostForEdit(): void {
    if (!this.editPostId) return;

    const post = this.postService.getPostById(this.editPostId);
    if (!post) {
      this.errorMessage = 'Post not found.';
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (post.userId !== currentUser?.userId) {
      this.errorMessage = 'You do not have permission to edit this post.';
      return;
    }

    this.isEditMode = true;
    this.currentPost = post;

    this.createPostForm.patchValue({
      title: post.title,
      content: post.content,
      departmentId: post.departmentName
    });
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
        
        if (this.isEditMode && this.editPostId && this.currentPost) {
          const updatedPost: Partial<Post> = {
            title: this.createPostForm.value.title.trim(),
            content: this.createPostForm.value.content.trim(),
            departmentName: selectedDepartment?.name || 'Unknown Department'
          };

          if (this.postService.updatePost(this.editPostId, updatedPost)) {
            this.router.navigate(['/post', this.editPostId]);
          } else {
            this.errorMessage = 'Failed to update post. Please try again.';
            this.isSubmitting = false;
          }
        } else {
          const newPost: Post = {
            postId: this.generateId(),
            title: this.createPostForm.value.title.trim(),
            content: this.createPostForm.value.content.trim(),
            userId: currentUser?.userId || 'anonymous',
            userName: currentUser?.fullName || 'Anonymous User',
            departmentName: selectedDepartment?.name || 'Unknown Department',
            createdAt: new Date().toISOString(),
            likes: 0,
            comments: [],
            isDeleted: false
          };

          this.postService.createPost(newPost);
          this.router.navigate(['/post-list']);
        }
      } catch (error) {
        this.errorMessage = 'Failed to save post. Please try again.';
        this.isSubmitting = false;
      }
    } else {
      this.createPostForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    if (this.isEditMode && this.editPostId) {
      this.router.navigate(['/post', this.editPostId]);
    } else {
      this.router.navigate(['/post-list']);
    }
  }

  private generateId(): string {
    return 'post_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

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

  getTitleCharCount(): number {
    return this.createPostForm.get('title')?.value?.length || 0;
  }

  getContentCharCount(): number {
    return this.createPostForm.get('content')?.value?.length || 0;
  }
}
