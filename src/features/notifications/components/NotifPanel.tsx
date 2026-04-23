import { useEffect, useRef } from 'react';
import { X, CheckCircle2, Info, AlertTriangle, XCircle, Check } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { cn, timeAgo } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const iconMap = {
  info: <Info size={16} className="text-accent-primary" />,
  success: <CheckCircle2 size={16} className="text-status-on-time-text" />,
  warning: <AlertTriangle size={16} className="text-status-late-text" />,
  error: <XCircle size={16} className="text-status-absent-text" />,
};

const bgMap = {
  info: 'bg-accent-primary/10 border-accent-primary/20',
  success: 'bg-status-on-time-bg border-status-on-time-border',
  warning: 'bg-status-late-bg border-status-late-border',
  error: 'bg-status-absent-bg border-status-absent-border',
};

export const NotifPanel = () => {
  const { isOpen, close, useList, markAllRead, markOneRead } = useNotifications();
  const panelRef = useRef<HTMLDivElement>(null);
  
  const { data: notifications = [] } = useList();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div
      ref={panelRef}
      className="absolute top-[60px] right-0 sm:right-4 w-full sm:w-[340px] sm:max-w-md h-[calc(100vh-60px)] sm:h-auto sm:max-h-[600px] z-40 bg-white sm:border border-background-border sm:rounded-2xl shadow-modal flex flex-col animate-slide-up sm:mt-2"
    >
      <div className="flex items-center justify-between p-4 border-b border-background-border">
        <h3 className="font-display font-bold text-text-primary text-sm">Notifications</h3>
        <button
          onClick={close}
          className="text-text-tertiary hover:text-text-primary p-1 rounded-md hover:bg-background-hover transition-colors sm:hidden"
        >
          <X size={18} />
        </button>
      </div>

      {unreadCount > 0 && (
        <div className="px-4 py-2 bg-background-secondary border-b border-background-border flex justify-between items-center">
          <span className="text-xs font-medium text-text-secondary">{unreadCount} unread</span>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs h-7 py-0 px-2"
            onClick={() => markAllRead()}
          >
            <Check size={14} className="mr-1" />
            Mark all read
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-2">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center px-4">
            <BellCloudIcon className="text-background-border mb-3 h-12 w-12" />
            <p className="text-sm font-medium text-text-secondary">No notifications</p>
            <p className="text-xs text-text-tertiary mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {notifications.map((notif) => (
              <div
                key={notif._id}
                onClick={() => {
                  if (!notif.isRead) markOneRead(notif._id);
                }}
                className={cn(
                  'p-3 rounded-xl flex items-start gap-3 transition-colors cursor-pointer',
                  notif.isRead ? 'hover:bg-background-hover opacity-60' : 'bg-background-secondary hover:bg-background-hover'
                )}
              >
                <div className={cn('mt-0.5 p-1.5 rounded-full border', bgMap[notif.type])}>
                  {iconMap[notif.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm mb-1', notif.isRead ? 'text-text-secondary' : 'text-text-primary')}>
                    {notif.message}
                  </p>
                  <p className="text-xs text-text-tertiary">{timeAgo(notif.createdAt)}</p>
                </div>
                {!notif.isRead && (
                  <div className="w-2 h-2 rounded-full bg-accent-primary mt-1.5 shrink-0" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BellCloudIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10.4 21a1.94 1.94 0 0 0 3.2 0" />
    <path d="M5.5 8H5a5 5 0 1 0 0 10h14a5 5 0 0 0 4.78-7 5 5 0 0 0-4.78-4h-.5a7 7 0 0 0-13 1" />
  </svg>
);
