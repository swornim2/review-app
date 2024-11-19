import { useState } from 'react';
import { PeerReview } from './PeerReview';
import { WriteReview } from './WriteReview';
import { MyReview } from './MyReview';
import { User, PeerNomination, ReviewRequest, Review } from '../../types/types';
import './ReviewDash.css';

interface ReviewDashProps {
  user: User;
  peerNominations: PeerNomination[];
  reviewRequests: ReviewRequest[];
  reviews: Review[];
  onAddPeer: () => void;
  onAcceptReview: (requestId: string) => void;
  onRejectReview: (requestId: string) => void;
  onSubmitReview: (review: Partial<Review>) => void;
}

type TabType = 'peer' | 'write' | 'my';

export const ReviewDash = ({
  user,
  peerNominations,
  reviewRequests,
  reviews,
  onAddPeer,
  onAcceptReview,
  onRejectReview,
  onSubmitReview,
}: ReviewDashProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('peer');

  const tabs = [
    { id: 'peer', label: 'Peer Nominations' },
    { id: 'write', label: 'Write Reviews' },
    { id: 'my', label: 'My Review' },
  ];

  return (
    <div className="review-dash-card">
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as TabType)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'peer' && (
          <PeerReview
            nominations={peerNominations}
            onAddPeer={onAddPeer}
          />
        )}
        {activeTab === 'write' && (
          <WriteReview
            requests={reviewRequests}
            onAccept={onAcceptReview}
            onReject={onRejectReview}
            onSubmit={onSubmitReview}
          />
        )}
        {activeTab === 'my' && (
          <MyReview
            user={user}
            reviews={reviews}
            onSubmitSelfReview={onSubmitReview}
          />
        )}
      </div>
    </div>
  );
};
