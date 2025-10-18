import { Comment } from './comment.model';

export interface Post {
  postId: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
  departmentName: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
}
