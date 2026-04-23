import { useAdminData } from '../hooks/useAdminData';
import { Users, UserCheck, UserX, Clock, FileWarning, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatPercent } from '@/lib/utils';

/** Advanced Admin Stats Cards — 3x2 Grid — Premium white theme */
const STATS_CONFIG = [
  {
    key: 'totalEmployees',
    title: 'Total Workforce',
    Icon: Users,
    color: '#4F46E5',
    bg: '#EEF2FF',
    trend: '+12%',
    isUp: true
  },
  {
    key: 'presentToday',
    title: 'On-site Active',
    Icon: UserCheck,
    color: '#16A34A',
    bg: '#F0FDF4',
    trend: '98%',
    isUp: true
  },
  {
    key: 'absentToday',
    title: 'Absenteeism',
    Icon: UserX,
    color: '#DC2626',
    bg: '#FEF2F2',
    trend: '-2%',
    isUp: false
  },
  {
    key: 'lateToday',
    title: 'Late Arrivals',
    Icon: Clock,
    color: '#EA580C',
    bg: '#FFF7ED',
    trend: 'Normal',
    isUp: true
  },
  {
    key: 'pendingRequests',
    title: 'Pending Approvals',
    Icon: FileWarning,
    color: '#D97706',
    bg: '#FFFBEB',
    trend: 'Critical',
    isUp: false
  },
  {
    key: 'attendanceRate',
    title: 'Global Avg.',
    Icon: TrendingUp,
    color: '#4F46E5',
    bg: '#EEF2FF',
    trend: '+4.2%',
    isUp: true,
    format: (v: number) => `${Math.round(v)}%`
  },
];

export const StatsCards = () => {
  const { useStats } = useAdminData();
  const { data: stats, isLoading } = useStats();

  if (isLoading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ height: '140px', borderRadius: '24px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }} className="animate-pulse" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="stats-grid-mobile">
      {STATS_CONFIG.map(({ key, title, Icon, color, bg, trend, isUp, format }, i) => {
        const raw = (stats as any)[key];
        const display = format ? format(raw) : raw;

        return (
          <div
            key={key}
            className="animate-slide-up"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #E2E8F0',
              borderRadius: '24px',
              padding: '28px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(15,23,42,0.06)',
              animationDelay: `${i * 60}ms`,
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(15,23,42,0.1)';
              e.currentTarget.style.borderColor = color;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(15,23,42,0.06)';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
          >
            {/* Background Texture Element */}
            <div style={{
              position: 'absolute', top: '-15px', right: '-15px', width: '100px', height: '100px',
              borderRadius: '50%', background: bg, opacity: 0.2, filter: 'blur(30px)', pointerEvents: 'none'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{
                height: '52px', width: '52px', borderRadius: '16px',
                backgroundColor: bg, color: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 16px -4px ${color}20`
              }}>
                <Icon size={26} />
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '6px 12px', borderRadius: '100px',
                backgroundColor: isUp ? '#F0FDF4' : '#FFF1F2',
                color: isUp ? '#16A34A' : '#E11D48',
                fontSize: '12px', fontWeight: 800,
                border: `1px solid ${isUp ? '#DCFCE7' : '#FFE4E6'}`
              }}>
                {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {trend}
              </div>
            </div>

            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</p>
              <h3 style={{ 
                fontFamily: '"Plus Jakarta Sans", sans-serif', 
                fontSize: '36px', 
                fontWeight: 800, 
                color: '#0F172A', 
                margin: '8px 0 0',
                lineHeight: 1
              }}>
                {display}
              </h3>
            </div>

            {/* Subtle Gradient Rim */}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '4px', height: '100%',
              backgroundColor: color, opacity: 0.1
            }} />
          </div>
        );
      })}
    </div>
  );
};
