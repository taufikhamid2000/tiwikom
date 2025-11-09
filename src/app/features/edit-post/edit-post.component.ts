import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { DepartmentService } from '../../core/services/department.service';
import { AuthService } from '../../core/services/auth.service';
import { Post } from '../../core/models/post.model';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  editPostForm: FormGroup;
  departments: any[] = [];
  isSubmitting = false;
  errorMessage = '';
  postId: string | null = null;
  currentPost: Post | null = null;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private departmentService: DepartmentService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editPostForm = this.fb.group({
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

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.postId = params['id'];
        this.loadPostForEdit();
      } else {
        this.errorMessage = 'Post ID not provided.';
        this.isLoading = false;
      }
    });
  }

  loadPostForEdit(): void {
    if (!this.postId) return;

    const post = this.postService.getPostById(this.postId);
    if (!post) {
      this.errorMessage = 'Post not found.';
      this.isLoading = false;
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (post.userId !== currentUser?.userId) {
      this.errorMessage = 'You do not have permission to edit this post.';
      this.isLoading = false;
      return;
    }

    this.currentPost = post;

    this.editPostForm.patchValue({
      title: post.title,
      content: post.content,
      departmentId: post.departmentName
    });

    this.isLoading = false;
  }

  get titleControl() {
    return this.editPostForm.get('title');
  }

  get contentControl() {
    return this.editPostForm.get('content');
  }

  get departmentControl() {
    return this.editPostForm.get('departmentId');
  }

  onSubmit(): void {
    if (this.editPostForm.valid && !this.isSubmitting && this.postId) {
      this.isSubmitting = true;
      this.errorMessage = '';

      try {
        const selectedDepartment = this.departments.find(d => d.departmentId === this.editPostForm.value.departmentId);
        
        const updatedPost: Partial<Post> = {
          title: this.editPostForm.value.title.trim(),
          content: this.editPostForm.value.content.trim(),
          departmentName: selectedDepartment?.name || 'Unknown Department'
        };

        if (this.postService.updatePost(this.postId, updatedPost)) {
          this.router.navigate(['/post', this.postId]);
        } else {
          this.errorMessage = 'Failed to update post. Please try again.';
          this.isSubmitting = false;
        }
      } catch (error) {
        this.errorMessage = 'Failed to save post. Please try again.';
        this.isSubmitting = false;
      }
    } else {
      this.editPostForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    if (this.postId) {
      this.router.navigate(['/post', this.postId]);
    } else {
      this.router.navigate(['/my-posts']);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.editPostForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.editPostForm.get(fieldName);
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
    return this.editPostForm.get('title')?.value?.length || 0;
  }

  getContentCharCount(): number {
    return this.editPostForm.get('content')?.value?.length || 0;
  }
}
