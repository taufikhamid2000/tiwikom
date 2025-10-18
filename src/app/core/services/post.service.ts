import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { mockPosts } from '../../mock-data/mock-posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() {}

  // Get all posts
  getPosts(): Post[] {
    return mockPosts;
  }

  // Get post by ID
  getPostById(id: string): Post | undefined {
    return mockPosts.find(p => p.postId === id);
  }
}
