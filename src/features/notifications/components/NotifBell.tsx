import { Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/features/auth/store/authStore';

export const NotifBell = () => {
  const { toggle, useList } = useNotifications();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  
  const { data: notifications = [] } = useList();
  
  if (!isAuthenticated) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <button
      onClick={toggle}
      className={cn(
        'relative p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-background-hover transition-colors focus:outline-none',
        unreadCount > 0 && 'text-text-primary'
      )}
      title="Notifications"
    >
      <Bell size={20} />
      {unreadCount > 0 && (
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse ring-2 ring-white" />
      )}
    </button>
  );
};
