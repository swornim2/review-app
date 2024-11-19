import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Overview } from './components/Overview/Overview';
import { ReviewCycle } from './components/ReviewCycle/ReviewCycle';
import { ReviewDash } from './components/ReviewDash/ReviewDash';
import { User, Notification, PeerNomination, ReviewRequest, Review } from './types/types';
import './App.css';

// Mock data - replace with actual API calls
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe',
  department: 'Engineering',
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'New review request from Jane Smith',
    read: false,
    timestamp: new Date(),
  },
  {
    id: '2',
    message: 'Your review for Mike Johnson is due tomorrow',
    read: true,
    timestamp: new Date(),
  },
];

const mockPeerNominations: PeerNomination[] = [
  {
    id: '1',
    peer: {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
      department: 'Design',
    },
    requestStatus: 'accepted',
    reviewStatus: 'completed',
  },
];

const mockReviewRequests: ReviewRequest[] = [
  {
    id: '1',
    from: {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson',
      department: 'Product',
    },
    status: 'pending',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
];

const mockReviews: Review[] = [
  {
    id: '1',
    reviewer: {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
      department: 'Design',
    },
    reviewee: mockUser,
    content: 'Great team player and excellent problem solver.',
    rating: 4,
    status: 'completed',
    createdAt: new Date(),
  },
];

export const App = () => {
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [peerNominations] = useState<PeerNomination[]>(mockPeerNominations);
  const [reviewRequests] = useState<ReviewRequest[]>(mockReviewRequests);
  const [reviews] = useState<Review[]>(mockReviews);

  // Mock handlers - replace with actual API calls
  const handleAddPeer = () => {
    console.log('Add peer');
  };

  const handleAcceptReview = (requestId: string) => {
    console.log('Accept review', requestId);
  };

  const handleRejectReview = (requestId: string) => {
    console.log('Reject review', requestId);
  };

  const handleSubmitReview = (review: Partial<Review>) => {
    console.log('Submit review', review);
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={mockUser} notifications={notifications} />
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Overview
                  user={mockUser}
                  stats={{
                    daysLeft: 14,
                    completedReviews: reviews.length,
                    totalReviews: 5,
                    completionPercentage: (reviews.length / 5) * 100,
                  }}
                />
              }
            />
            <Route
              path="/review-cycles"
              element={
                <ReviewCycle
                  cycles={[
                    {
                      id: '1',
                      name: 'Q2 2023 Performance Review',
                      completion: 60,
                      status: 'active',
                      department: 'Engineering',
                    },
                  ]}
                />
              }
            />
            <Route
              path="/peer-reviews"
              element={
                <ReviewDash
                  user={mockUser}
                  peerNominations={peerNominations}
                  reviewRequests={reviewRequests}
                  reviews={reviews}
                  onAddPeer={handleAddPeer}
                  onAcceptReview={handleAcceptReview}
                  onRejectReview={handleRejectReview}
                  onSubmitReview={handleSubmitReview}
                />
              }
            />
            <Route
              path="/write-reviews"
              element={
                <ReviewDash
                  user={mockUser}
                  peerNominations={peerNominations}
                  reviewRequests={reviewRequests}
                  reviews={reviews}
                  onAddPeer={handleAddPeer}
                  onAcceptReview={handleAcceptReview}
                  onRejectReview={handleRejectReview}
                  onSubmitReview={handleSubmitReview}
                />
              }
            />
            <Route
              path="/my-review"
              element={
                <ReviewDash
                  user={mockUser}
                  peerNominations={peerNominations}
                  reviewRequests={reviewRequests}
                  reviews={reviews}
                  onAddPeer={handleAddPeer}
                  onAcceptReview={handleAcceptReview}
                  onRejectReview={handleRejectReview}
                  onSubmitReview={handleSubmitReview}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};
