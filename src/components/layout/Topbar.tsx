import { LogOut, Search } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Avatar } from '@/components/ui/Avatar';
import { NotifBell } from '@/features/notifications/components/NotifBell';

/** Premium Topbar with polished profile section and search — white theme */
export const Topbar = () => {
  const { user, logout, isLoggingOut } = useAuth();

  return (
    <header style={{
      height: '60px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      flexShrink: 0,
    }}>
      {/* Mobile brand */}
      <div className="flex items-center gap-3 md:hidden">
        <div style={{
          height: '28px', width: '28px', borderRadius: '8px',
          background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: '12px',
        }}>Q</div>
        <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>
          QuamBase<span style={{ color: '#4F46E5' }}>HR</span>
        </span>
      </div>

      {/* Desktop search */}
      <div className="hidden md:flex items-center flex-1 max-w-xs">
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search activities…"
            className="field"
            style={{ 
              paddingLeft: '36px', 
              fontSize: '13px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              height: '36px',
              width: '100%',
              outline: 'none',
              transition: 'all 0.15s'
            }}
            onFocus={e => {
              e.target.style.borderColor = '#4F46E5';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.08)';
            }}
            onBlur={e => {
              e.target.style.borderColor = '#E2E8F0';
              e.target.style.backgroundColor = '#F8FAFC';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <NotifBell />

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', backgroundColor: '#E2E8F0', margin: '0 8px' }} />

        {/* Polished Profile Section */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '6px 10px',
            borderRadius: '12px',
            cursor: 'default',
            transition: 'all 0.15s',
            userSelect: 'none'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#F8FAFC';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div style={{ position: 'relative' }}>
            <Avatar name={user?.name || 'User'} size="sm" />
            <div style={{
              position: 'absolute',
              bottom: '-1px',
              right: '-1px',
              height: '10px',
              width: '10px',
              borderRadius: '50%',
              backgroundColor: '#16A34A',
              border: '2px solid #ffffff'
            }} />
          </div>
          
          <div className="hidden sm:flex flex-col">
            <span style={{ 
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: '13px', 
              fontWeight: 800, 
              color: '#0F172A', 
              lineHeight: 1.1 
            }}>
              {user?.name}
            </span>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 600,
              color: '#64748B', 
              marginTop: '1px' 
            }}>
              {user?.role === 'admin' ? 'Administrator' : user?.department || 'Employee'}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => logout()}
          disabled={isLoggingOut}
          title="Sign out"
          style={{
            height: '36px',
            width: '36px',
            borderRadius: '10px',
            border: 'none',
            background: 'transparent',
            color: '#94A3B8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s',
            marginLeft: '4px',
          }}
          onMouseEnter={e => { 
            e.currentTarget.style.background = '#FEF2F2'; 
            e.currentTarget.style.color = '#DC2626'; 
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(220,38,38,0.1)';
          }}
          onMouseLeave={e => { 
            e.currentTarget.style.background = 'transparent'; 
            e.currentTarget.style.color = '#94A3B8';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};
