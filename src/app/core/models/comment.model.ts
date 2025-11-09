export interface Comment {
  commentId: string;
  content: string;
  userName: string;
  createdAt: string;
  replies?: Reply[];
}

export interface Reply {
  replyId: string;
  content: string;
  userName: string;
  createdAt: string;
}
