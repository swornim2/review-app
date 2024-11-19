import { ReviewCycle as ReviewCycleType } from '../../types/types';
import './ReviewCycle.css';

interface ReviewCycleProps {
  cycles: ReviewCycleType[];
}

export const ReviewCycle = ({ cycles }: ReviewCycleProps) => {
  return (
    <div className="review-cycle-card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Cycles</h2>
      
      <div className="overflow-x-auto">
        <table className="review-cycle-table">
          <thead>
            <tr>
              <th>Review Cycle</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.name}</td>
                <td>
                  <div className="progress-wrapper">
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${cycle.completion}%` }}
                      />
                    </div>
                    <span className="progress-text">{cycle.completion}%</span>
                  </div>
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      cycle.status === 'active' ? 'active' : 'completed'
                    }`}
                  >
                    {cycle.status}
                  </span>
                </td>
                <td>{cycle.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
