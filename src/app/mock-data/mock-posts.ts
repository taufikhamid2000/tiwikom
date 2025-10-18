import { Post } from '../core/models/post.model';

export const mockPosts: Post[] = [
  {
    postId: '1',
    title: 'How to request VPN access',
    content: 'Go to the IT portal → Submit the VPN request form → Wait 24 hours for approval.',
    userId: 'u1',
    userName: 'Aiman',
    departmentName: 'IT Support',
    createdAt: '2025-10-01T09:00:00Z',
    likes: 5,
    comments: [
      {
        commentId: 'c1',
        content: 'Did not know that before!',
        userName: 'Farah',
        createdAt: '2025-10-02T10:00:00Z'
      },
      {
        commentId: 'c2',
        content: 'This should be pinned!',
        userName: 'Rafiq',
        createdAt: '2025-10-03T08:00:00Z'
      }
    ]
  },
  {
    postId: '2',
    title: 'Printer setup for new laptops',
    content: 'Install HP Smart → Add Printer → Choose “Company Printer HQ 02”.',
    userId: 'u2',
    userName: 'Farah',
    departmentName: 'HR',
    createdAt: '2025-10-05T11:00:00Z',
    likes: 3,
    comments: []
  }
];
