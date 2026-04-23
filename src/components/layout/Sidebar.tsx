import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Shield,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/features/auth/store/authStore';
import { NAV_ITEMS, ADMIN_NAV_ITEMS } from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={18} />,
  Calendar: <Calendar size={18} />,
  FileText: <FileText size={18} />,
  Shield: <Shield size={18} />,
  BarChart3: <BarChart3 size={18} />,
  ClipboardCheck: <ClipboardCheck size={18} />,
};

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === 'admin';

  return (
    <aside style={{
      width: collapsed ? '68px' : '240px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #E2E8F0',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      transition: 'width 0.3s ease',
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: collapsed ? '0 12px' : '0 20px',
        borderBottom: '1px solid #E2E8F0',
        justifyContent: collapsed ? 'center' : 'flex-start',
        gap: '12px',
        flexShrink: 0,
      }}>
        <div style={{
          height: '32px',
          width: '32px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 800,
          fontSize: '14px',
          flexShrink: 0,
          boxShadow: '0 1px 4px rgba(79,70,229,0.3)',
        }}>Q</div>
        {!collapsed && (
          <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '15px', color: '#0F172A', whiteSpace: 'nowrap' }}>
            QuamBase<span style={{ color: '#4F46E5' }}>HR</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {!collapsed && (
          <p style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 12px 8px' }}>
            {isAdmin ? 'Administration' : 'Main Menu'}
          </p>
        )}

        {(!isAdmin ? NAV_ITEMS : ADMIN_NAV_ITEMS).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={(item as any).path === '/admin'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: collapsed ? '10px' : '9px 12px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all 0.15s',
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: isActive ? 'linear-gradient(135deg,#EEF2FF,#E0E7FF)' : 'transparent',
              color: isActive ? '#4F46E5' : '#475569',
              position: 'relative',
            })}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '3px', height: '20px', background: '#4F46E5', borderRadius: '0 4px 4px 0' }} />
                )}
                <span style={{ color: isActive ? '#4F46E5' : '#94A3B8', flexShrink: 0 }}>
                  {iconMap[item.icon]}
                </span>
                {!collapsed && item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div style={{ padding: '12px', borderTop: '1px solid #E2E8F0', flexShrink: 0 }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: collapsed ? '8px' : '8px 12px',
            borderRadius: '10px',
            border: 'none',
            background: 'transparent',
            color: '#94A3B8',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 500,
            justifyContent: collapsed ? 'center' : 'flex-start',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#F1F5F9')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
};
