export interface User {
  id: string;
  name: string;
  avatar: string;
  department: string;
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

export interface ReviewCycle {
  id: string;
  name: string;
  completion: number;
  status: 'active' | 'completed';
  department: string;
}

export interface PeerNomination {
  id: string;
  peer: User;
  requestStatus: 'accepted' | 'rejected' | 'pending';
  reviewStatus: 'completed' | 'pending';
}

export interface ReviewRequest {
  id: string;
  from: User;
  status: 'accepted' | 'rejected' | 'pending';
  dueDate: Date;
}

export interface Review {
  id: string;
  reviewer: User;
  reviewee: User;
  content: string;
  rating: number;
  status: 'completed' | 'pending';
  createdAt: Date;
}

export interface OverviewStats {
  daysLeft: number;
  completedReviews: number;
  totalReviews: number;
  completionPercentage: number;
}
