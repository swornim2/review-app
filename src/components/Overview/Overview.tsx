import { User, OverviewStats } from '../../types/types';
import './Overview.css';

interface OverviewProps {
  user: User;
  stats: OverviewStats;
}

export const Overview = ({ user, stats }: OverviewProps) => {
  return (
    <div className="overview-card">
      <div className="greeting-section">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.name}! 👋
        </h2>
        <p className="text-gray-600 mt-1">
          Here's your review progress overview
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Days Left</h3>
            <p className="stat-value">{stats.daysLeft}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Reviews Completed</h3>
            <p className="stat-value">{stats.completedReviews} / {stats.totalReviews}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-purple-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Completion</h3>
            <p className="stat-value">{stats.completionPercentage}%</p>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-bar-container">
          <div 
            className="progress-bar"
            style={{ width: `${stats.completionPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Overall Progress
        </p>
      </div>
    </div>
  );
};
