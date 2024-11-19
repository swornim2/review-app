import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import './Sidebar.css';
import React from 'react';

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const navigation = [
  { id: 'overview', name: 'Overview', icon: HomeIcon },
  { id: 'review-cycles', name: 'Review Cycles', icon: ClipboardDocumentListIcon },
  { id: 'peer-reviews', name: 'Peer Reviews', icon: UserGroupIcon },
  { id: 'write-reviews', name: 'Write Reviews', icon: DocumentTextIcon },
  { id: 'my-review', name: 'My Review', icon: UserIcon },
];

export const Sidebar = ({ 
  activeSection = 'overview', 
  onSectionChange,
  isOpen = false,
  onClose
}: SidebarProps) => {
  const handleClick = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
    // Close sidebar on mobile after clicking
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay open" onClick={onClose} />
      )}
      <div className={`sidebar bg-white shadow-lg ${isOpen ? 'open' : ''}`}>
        <div className="flex flex-col h-full">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.name}
                  onClick={() => handleClick(item.id)}
                  className={`sidebar-link ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      isActive ? 'text-white' : 'text-gray-500'
                    }`}
                  />
                  <span className="ml-3">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
