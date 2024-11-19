import { useState } from 'react';
import { User, Review } from '../../types/types';

interface MyReviewProps {
  user: User;
  reviews: Review[];
  onSubmitSelfReview: (review: Partial<Review>) => void;
}

export const MyReview = ({ user, reviews, onSubmitSelfReview }: MyReviewProps) => {
  const [selfReviewContent, setSelfReviewContent] = useState('');
  const [showSelfReview, setShowSelfReview] = useState(false);

  const peerReviews = reviews.filter(
    (review) => review.reviewee.id === user.id && review.reviewer.id !== user.id
  );

  const selfReview = reviews.find(
    (review) => review.reviewee.id === user.id && review.reviewer.id === user.id
  );

  const calculateAverageRating = () => {
    if (peerReviews.length === 0) return 0;
    const sum = peerReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / peerReviews.length).toFixed(1);
  };

  const handleSubmitSelfReview = () => {
    onSubmitSelfReview({
      content: selfReviewContent,
      status: 'completed',
    });
    setShowSelfReview(false);
    setSelfReviewContent('');
  };

  return (
    <div className="my-review">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Performance Summary
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Average Rating</p>
            <p className="text-2xl font-bold text-gray-900">
              {calculateAverageRating()} / 5
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Reviews Received</p>
            <p className="text-2xl font-bold text-gray-900">
              {peerReviews.length} / 5
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Self Review</h3>
          {!selfReview && !showSelfReview && (
            <button
              onClick={() => setShowSelfReview(true)}
              className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90"
            >
              Write Self Review
            </button>
          )}
        </div>

        {showSelfReview && (
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <textarea
              value={selfReviewContent}
              onChange={(e) => setSelfReviewContent(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary mb-4"
              placeholder="Write your self review here..."
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowSelfReview(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitSelfReview}
                className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90"
                disabled={!selfReviewContent.trim()}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {selfReview && (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">{selfReview.content}</p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Peer Reviews
        </h3>
        {peerReviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No peer reviews received yet.
          </div>
        ) : (
          <div className="space-y-4">
            {peerReviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={review.reviewer.avatar}
                      alt={review.reviewer.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="font-medium text-gray-900">
                      {review.reviewer.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="font-medium">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-700">{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
