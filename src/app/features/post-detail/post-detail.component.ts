import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf, NgFor, DatePipe } from '@angular/common';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, DatePipe],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: any;
  isOwner = false;
  currentUserId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.post = this.postService.getPostById(id);
      if (!this.post) {
        this.router.navigate(['/post-list']);
        return;
      }

      const currentUser = this.authService.getCurrentUser();
      this.currentUserId = currentUser?.userId || null;
      this.isOwner = this.post.userId === this.currentUserId;
    }
  }

  editPost(): void {
    if (this.post && this.isOwner) {
      this.router.navigate(['/create-post'], { queryParams: { id: this.post.postId, edit: true } });
    }
  }
}
