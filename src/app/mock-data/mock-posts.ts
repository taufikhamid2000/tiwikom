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
    content: 'Install HP Smart → Add Printer → Choose "Company Printer HQ 02".',
    userId: 'u2',
    userName: 'Farah',
    departmentName: 'HR',
    createdAt: '2025-10-05T11:00:00Z',
    likes: 3,
    comments: []
  },
  {
    postId: '3',
    title: 'Updated Security Policy 2025',
    content: 'Please review the new security guidelines for handling sensitive data. All employees must complete the security training module by end of month.',
    userId: 'u3',
    userName: 'Rafiq',
    departmentName: 'Operations',
    createdAt: '2025-11-01T14:30:00Z',
    likes: 12,
    comments: [
      {
        commentId: 'c3',
        content: 'Thanks for the important update!',
        userName: 'Aiman',
        createdAt: '2025-11-01T15:00:00Z'
      }
    ]
  },
  {
    postId: '4',
    title: 'Q4 Performance Review Schedule',
    content: 'Q4 performance reviews will be conducted from November 15 to November 30. Please schedule your reviews with your direct managers. All reviews must be completed by end of Q4.',
    userId: 'u3',
    userName: 'Rafiq',
    departmentName: 'Operations',
    createdAt: '2025-11-03T10:15:00Z',
    likes: 8,
    comments: []
  },
  {
    postId: '5',
    title: 'Best practices for email communication',
    content: 'Keep emails concise and professional. Use clear subject lines, address recipients properly, and always proofread before sending. Reply-all can wait!',
    userId: 'u1',
    userName: 'Aiman',
    departmentName: 'IT Support',
    createdAt: '2025-11-02T08:30:00Z',
    likes: 7,
    comments: [
      {
        commentId: 'c4',
        content: 'Great tips! The reply-all warning is gold.',
        userName: 'Sarah',
        createdAt: '2025-11-02T09:15:00Z'
      }
    ]
  },
  {
    postId: '6',
    title: 'Flexible work from home policy',
    content: 'Starting November 2025, all employees can work from home up to 3 days per week. Just notify your manager and update your calendar. No special approval needed!',
    userId: 'u2',
    userName: 'Farah',
    departmentName: 'HR',
    createdAt: '2025-11-01T16:45:00Z',
    likes: 24,
    comments: [
      {
        commentId: 'c5',
        content: 'This is wonderful news!',
        userName: 'Ahmed',
        createdAt: '2025-11-01T17:30:00Z'
      },
      {
        commentId: 'c6',
        content: 'Finally! Been waiting for this.',
        userName: 'Maya',
        createdAt: '2025-11-02T08:00:00Z'
      }
    ]
  },
  {
    postId: '7',
    title: 'How to access the internal knowledge base',
    content: 'The company knowledge base is available at wiki.company.local. Use your employee ID to login. Search for common issues or contribute your own solutions!',
    userId: 'u4',
    userName: 'Ahmed',
    departmentName: 'Engineering',
    createdAt: '2025-10-28T13:20:00Z',
    likes: 11,
    comments: [
      {
        commentId: 'c7',
        content: 'This saved me so much time!',
        userName: 'Aiman',
        createdAt: '2025-10-29T10:00:00Z'
      }
    ]
  },
  {
    postId: '8',
    title: 'Onboarding checklist for new hires',
    content: 'Every new employee should complete: 1) Laptop setup 2) Access credentials 3) Team introductions 4) Department training 5) Security compliance. Typically takes 3-5 days.',
    userId: 'u2',
    userName: 'Farah',
    departmentName: 'HR',
    createdAt: '2025-10-25T09:00:00Z',
    likes: 15,
    comments: [
      {
        commentId: 'c8',
        content: 'Wish I had this on my first day!',
        userName: 'Lena',
        createdAt: '2025-10-26T11:30:00Z'
      },
      {
        commentId: 'c9',
        content: 'Very comprehensive list.',
        userName: 'Carlos',
        createdAt: '2025-10-27T14:00:00Z'
      },
      {
        commentId: 'c10',
        content: 'Adding this to our onboarding docs!',
        userName: 'Sophia',
        createdAt: '2025-10-28T08:45:00Z'
      }
    ]
  },
  {
    postId: '9',
    title: 'How to submit expense reports',
    content: 'Use the Finance Portal to submit expenses. Attach receipts, categorize by project, and submit within 30 days. Reimbursement typically processed within 2 weeks.',
    userId: 'u5',
    userName: 'Marcus',
    departmentName: 'Finance',
    createdAt: '2025-10-20T14:30:00Z',
    likes: 6,
    comments: []
  },
  {
    postId: '10',
    title: 'Meeting room booking system update',
    content: 'The new booking system is now live! Navigate to rooms.company.com, search for available rooms by floor/capacity, and book directly. No more email chains!',
    userId: 'u3',
    userName: 'Rafiq',
    departmentName: 'Operations',
    createdAt: '2025-10-22T11:00:00Z',
    likes: 19,
    comments: [
      {
        commentId: 'c11',
        content: 'Finally! This is so much better.',
        userName: 'Jessica',
        createdAt: '2025-10-23T09:30:00Z'
      },
      {
        commentId: 'c12',
        content: 'Game changer for scheduling.',
        userName: 'Daniel',
        createdAt: '2025-10-24T15:00:00Z'
      }
    ]
  },
  {
    postId: '11',
    title: 'Company wellness program details',
    content: 'We offer gym memberships, mental health support, yoga classes, and health screenings. All employees are eligible. Sign up through the HR portal by end of November!',
    userId: 'u2',
    userName: 'Farah',
    departmentName: 'HR',
    createdAt: '2025-10-18T10:15:00Z',
    likes: 21,
    comments: [
      {
        commentId: 'c13',
        content: 'Great benefits! Already signed up.',
        userName: 'Nina',
        createdAt: '2025-10-19T14:45:00Z'
      }
    ]
  },
  {
    postId: '12',
    title: 'Tips for productive remote work',
    content: 'Create a dedicated workspace, set working hours, take breaks, stay connected with team via Slack, and avoid distractions. Productivity actually increases with proper setup!',
    userId: 'u1',
    userName: 'Aiman',
    departmentName: 'IT Support',
    createdAt: '2025-10-15T09:30:00Z',
    likes: 18,
    comments: [
      {
        commentId: 'c14',
        content: 'The dedicated workspace tip is key!',
        userName: 'Robert',
        createdAt: '2025-10-16T13:00:00Z'
      },
      {
        commentId: 'c15',
        content: 'Really helpful for new remote workers.',
        userName: 'Emily',
        createdAt: '2025-10-17T10:20:00Z'
      }
    ]
  },
  {
    postId: '13',
    title: 'Annual leave policy 2025',
    content: 'Employees receive 20 days annual leave. Must be planned 2 weeks in advance. Public holidays do not count against your quota. Plan your time off wisely!',
    userId: 'u2',
    userName: 'Farah',
    departmentName: 'HR',
    createdAt: '2025-10-10T16:00:00Z',
    likes: 13,
    comments: [
      {
        commentId: 'c16',
        content: 'Good to know about public holidays!',
        userName: 'Lisa',
        createdAt: '2025-10-11T09:00:00Z'
      }
    ]
  }
];
