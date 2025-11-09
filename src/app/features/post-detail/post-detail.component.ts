import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf, NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, DatePipe, FormsModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: any;
  isOwner = false;
  currentUserId: string | null = null;
  currentUserName: string | null = null;
  newComment = '';
  isAuthenticated = false;
  replyingTo: string | null = null;
  replyText = '';
  expandedComments: Set<string> = new Set();

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
      this.currentUserName = currentUser?.fullName || null;
      this.isAuthenticated = !!currentUser;
      this.isOwner = this.post.userId === this.currentUserId;
    }
  }

  addComment(): void {
    if (!this.newComment.trim()) {
      return;
    }

    if (!this.isAuthenticated || !this.currentUserName) {
      alert('Please log in to add a comment.');
      return;
    }

    // Create new comment
    const comment = {
      commentId: `c${Date.now()}`,
      content: this.newComment.trim(),
      userName: this.currentUserName,
      createdAt: new Date().toISOString()
    };

    // Add comment to post
    if (this.post.comments) {
      this.post.comments.push(comment);
    } else {
      this.post.comments = [comment];
    }

    // Update post in service
    this.postService.updatePost(this.post.postId, { comments: this.post.comments });

    // Clear input
    this.newComment = '';
  }

  editPost(): void {
    if (this.post && this.isOwner) {
      this.router.navigate(['/create-post'], { queryParams: { id: this.post.postId, edit: true } });
    }
  }

  toggleReplyForm(commentId: string): void {
    if (this.replyingTo === commentId) {
      this.replyingTo = null;
      this.replyText = '';
    } else {
      this.replyingTo = commentId;
      this.replyText = '';
    }
  }

  toggleExpandReplies(commentId: string): void {
    if (this.expandedComments.has(commentId)) {
      this.expandedComments.delete(commentId);
    } else {
      this.expandedComments.add(commentId);
    }
  }

  isRepliesExpanded(commentId: string): boolean {
    return this.expandedComments.has(commentId);
  }

  addReply(commentId: string): void {
    if (!this.replyText.trim()) {
      return;
    }

    if (!this.isAuthenticated || !this.currentUserName) {
      alert('Please log in to reply.');
      return;
    }

    // Find the comment
    const comment = this.post.comments.find((c: any) => c.commentId === commentId);
    if (!comment) {
      return;
    }

    // Create new reply
    const reply = {
      replyId: `r${Date.now()}`,
      content: this.replyText.trim(),
      userName: this.currentUserName,
      createdAt: new Date().toISOString()
    };

    // Add reply to comment
    if (!comment.replies) {
      comment.replies = [];
    }
    comment.replies.push(reply);

    // Update post in service
    this.postService.updatePost(this.post.postId, { comments: this.post.comments });

    // Reset reply form
    this.replyingTo = null;
    this.replyText = '';

    // Expand the replies section to show the new reply
    this.expandedComments.add(commentId);
  }

  getReplies(commentId: string): any[] {
    const comment = this.post.comments.find((c: any) => c.commentId === commentId);
    return comment?.replies || [];
  }
}