import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

/** Placeholder component for empty lists/views — white theme optimized */
export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
        textAlign: 'center',
        backgroundColor: '#ffffff'
      }}
      className={className}
    >
      <div style={{
        height: '80px',
        width: '80px',
        borderRadius: '24px',
        backgroundColor: '#F8FAFC',
        border: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        color: '#94A3B8'
      }}>
        {icon}
      </div>
      
      <h3 style={{
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontSize: '18px',
        fontWeight: 800,
        color: '#0F172A',
        marginBottom: '8px',
        margin: '0 0 8px 0'
      }}>
        {title}
      </h3>
      
      <p style={{
        fontSize: '14px',
        color: '#64748B',
        maxWidth: '300px',
        lineHeight: 1.6,
        margin: '0 0 24px 0'
      }}>
        {description}
      </p>
      
      {action && (
        <div style={{ marginTop: '24px' }}>
          {action}
        </div>
      )}
    </div>
  );
};
