import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { mockPosts } from '../../mock-data/mock-posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [...mockPosts];

  constructor() {}

  // Get all active posts (excluding soft deleted)
  getPosts(): Post[] {
    return this.posts
      .filter(p => !p.isDeleted)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Get all posts including deleted (for admin view)
  getAllPostsIncludingDeleted(): Post[] {
    return this.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Get post by ID (active only)
  getPostById(id: string): Post | undefined {
    return this.posts.find(p => p.postId === id && !p.isDeleted);
  }

  // Get post by ID including deleted posts
  getPostByIdIncludingDeleted(id: string): Post | undefined {
    return this.posts.find(p => p.postId === id);
  }

  // Create a new post
  createPost(post: Post): void {
    this.posts.unshift(post); // Add to beginning of array (newest first)
  }

  // Update an existing post
  updatePost(postId: string, updates: Partial<Post>): boolean {
    const index = this.posts.findIndex(p => p.postId === postId);
    if (index !== -1) {
      this.posts[index] = { ...this.posts[index], ...updates };
      return true;
    }
    return false;
  }

  // Soft delete a post
  softDeletePost(postId: string): boolean {
    const index = this.posts.findIndex(p => p.postId === postId);
    if (index !== -1) {
      this.posts[index] = {
        ...this.posts[index],
        isDeleted: true,
        deletedAt: new Date().toISOString()
      };
      return true;
    }
    return false;
  }

  // Hard delete a post (permanent)
  deletePost(postId: string): boolean {
    const index = this.posts.findIndex(p => p.postId === postId);
    if (index !== -1) {
      this.posts.splice(index, 1);
      return true;
    }
    return false;
  }

  // Add a like to a post
  toggleLike(postId: string): boolean {
    const post = this.getPostById(postId);
    if (post) {
      post.likes = Math.max(0, post.likes + 1); // Simple increment for now
      return true;
    }
    return false;
  }
}
