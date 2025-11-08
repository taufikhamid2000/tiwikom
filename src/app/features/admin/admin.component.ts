import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  totalPosts = 0;
  totalUsers = 0;
  totalComments = 0;
  totalLikes = 0;
  recentPosts: any[] = [];

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    // Get all posts
    const allPosts = this.postService.getPosts();
    this.totalPosts = allPosts.length;
    this.recentPosts = allPosts.slice(0, 5);

    // Calculate total comments and likes
    this.totalComments = allPosts.reduce((sum, post) => sum + (post.comments?.length || 0), 0);
    this.totalLikes = allPosts.reduce((sum, post) => sum + (post.likes || 0), 0);

    // Get total users
    this.totalUsers = this.userService.getUsers().length;
  }

  formatDate(date: Date): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  goToManagePosts(): void {
    this.router.navigate(['/admin/manage-posts']);
  }
}
