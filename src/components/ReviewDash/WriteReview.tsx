import { useState } from 'react';
import { ReviewRequest, Review } from '../../types/types';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface WriteReviewProps {
  requests: ReviewRequest[];
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
  onSubmit: (review: Partial<Review>) => void;
}

export const WriteReview = ({
  requests,
  onAccept,
  onReject,
  onSubmit,
}: WriteReviewProps) => {
  const [activeReview, setActiveReview] = useState<string | null>(null);
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (requestId: string) => {
    onSubmit({
      content: reviewContent,
      rating,
      status: 'completed',
    });
    setActiveReview(null);
    setReviewContent('');
    setRating(0);
  };

  return (
    <div className="write-review">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Write Reviews</h3>

      {requests.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No review requests at the moment.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 bg-gray-50">
                <div className="flex items-center space-x-4">
                  <img
                    src={request.from.avatar}
                    alt={request.from.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {request.from.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Due: {request.dueDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {request.status === 'pending' ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onAccept(request.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onReject(request.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {request.status}
                  </span>
                )}
              </div>

              {request.status === 'accepted' &&
                activeReview === request.id && (
                  <div className="p-4 border-t border-gray-200">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                      </label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`text-2xl ${
                              star <= rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Review
                      </label>
                      <textarea
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Write your review here..."
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setActiveReview(null)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSubmit(request.id)}
                        className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90"
                        disabled={!rating || !reviewContent.trim()}
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                )}

              {request.status === 'accepted' &&
                activeReview !== request.id && (
                  <div className="p-4 border-t border-gray-200">
                    <button
                      onClick={() => setActiveReview(request.id)}
                      className="w-full px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10"
                    >
                      Write Review
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
