import { PeerNomination } from '../../types/types';
import { UserPlusIcon } from '@heroicons/react/24/outline';

interface PeerReviewProps {
  nominations: PeerNomination[];
  onAddPeer: () => void;
}

export const PeerReview = ({ nominations, onAddPeer }: PeerReviewProps) => {
  return (
    <div className="peer-review">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Peer Nominations</h3>
        {nominations.length < 5 && (
          <button
            onClick={onAddPeer}
            className="flex items-center px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <UserPlusIcon className="h-5 w-5 mr-2" />
            Add Peer
          </button>
        )}
      </div>

      {nominations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No peer nominations yet. Click "Add Peer" to start.
        </div>
      ) : (
        <div className="space-y-4">
          {nominations.map((nomination) => (
            <div
              key={nomination.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={nomination.peer.avatar}
                  alt={nomination.peer.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {nomination.peer.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {nomination.peer.department}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    nomination.requestStatus === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : nomination.requestStatus === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {nomination.requestStatus}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    nomination.reviewStatus === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {nomination.reviewStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
