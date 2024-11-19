import { useState } from 'react';
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Notification, User } from '../../types/types';
import './Navbar.css';
import React from 'react';

interface NavbarProps {
  user: User;
  notifications: Notification[];
  onLogout: () => void;
  onMenuClick?: () => void;
}

export const Navbar = ({ user, notifications, onLogout, onMenuClick }: NavbarProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="navbar bg-white shadow-md">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo on the left */}
          <div className="logo-container">
            <img src="/fuse.png" alt="Fuse Logo" className="logo" />
          </div>

          {/* Right side content */}
          <div className="right-content">
            {/* Hamburger Menu Button (mobile only) */}
            <button 
              className="menu-toggle md:hidden" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-600" />
              )}
            </button>

            {/* User Info and Menu Items */}
            <div className={`menu-items ${isMenuOpen ? 'show' : ''}`}>
              <div className="user-container">
                <img src={user.avatar} alt={user.name} className="user-avatar" />
                <span className="user-name">{user.name}</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="icon-button"
                >
                  <BellIcon className="h-6 w-6 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </button>

                {showNotifications && (
                  <div className="notification-dropdown">
                    <div className="py-2">
                      {notifications.length === 0 ? (
                        <p className="px-4 py-2 text-sm text-gray-500">
                          No notifications
                        </p>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`notification-item ${
                              !notification.read ? 'unread' : ''
                            }`}
                          >
                            <p className="notification-message">
                              {notification.message}
                            </p>
                            <p className="notification-timestamp">
                              {notification.timestamp.toLocaleDateString()}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button onClick={onLogout} className="logout-button">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
