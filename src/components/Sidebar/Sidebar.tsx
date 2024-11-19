import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import './Sidebar.css';

const navigation = [
  { name: 'Overview', href: '/', icon: HomeIcon },
  { name: 'Review Cycles', href: '/review-cycles', icon: ClipboardDocumentListIcon },
  { name: 'Peer Reviews', href: '/peer-reviews', icon: UserGroupIcon },
  { name: 'Write Reviews', href: '/write-reviews', icon: DocumentTextIcon },
  { name: 'My Review', href: '/my-review', icon: UserIcon },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar bg-white shadow-lg">
      <div className="flex flex-col h-full">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
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
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
