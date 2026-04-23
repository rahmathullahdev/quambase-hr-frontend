import { useAuthStore } from '@/features/auth/store/authStore';
import { PageHeader } from '@/components/layout/PageHeader';
import { CheckInOutCard } from '@/features/attendance/components/CheckInOutCard';
import { useAttendance } from '@/features/attendance/hooks/useAttendance';
import { useCheckIn } from '@/features/attendance/hooks/useCheckIn';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatDate } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar as CalendarIcon, Clock, Activity, CheckCircle2, AlertCircle, Percent, Target, TrendingUp, Zap } from 'lucide-react';

/** Employee Dashboard — Intelligence Tier UI v2 (Premium Analytics) */
export const DashboardPage = () => {
  const user = useAuthStore((s) => s.user);
  const { useHistory } = useAttendance();
  const { todayRecord } = useCheckIn();
  const { data: historyData, isLoading } = useHistory(1, 6);

  const isActive = todayRecord && todayRecord.checkIn && !todayRecord.checkOut;

  const stats = [
    { label: 'Present', value: '18', sub: 'Days this month', icon: <CheckCircle2 size={18} />, color: '#16A34A', bg: '#F0FDF4', iconBg: '#ffffff' },
    { label: 'Late', value: '2', sub: 'Days this month', icon: <Clock size={18} />, color: '#EA580C', bg: '#FFF7ED', iconBg: '#ffffff' },
    { label: 'Pending', value: '1', sub: 'Requests', icon: <AlertCircle size={18} />, color: '#D97706', bg: '#FFFBEB', iconBg: '#ffffff' },
    { label: 'Rate', value: '94%', sub: 'Attendance', icon: <Percent size={18} />, color: '#4F46E5', bg: '#EEF2FF', iconBg: '#ffffff' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '48px' }}>
      {/* Immersive Hero Section */}
      <div style={{
        position: 'relative',
        padding: '40px',
        backgroundColor: '#0F172A',
        borderRadius: '32px',
        overflow: 'hidden',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 20px 40px rgba(15,23,42,0.15)'
      }}>
        {/* Animated Background Gradients */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(79,70,229,0.2) 0%, rgba(79,70,229,0) 70%)', filter: 'blur(40px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 70%)', filter: 'blur(40px)', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '32px', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
              Good day, {user?.name.split(' ')[0]} <span style={{ fontSize: '28px' }}>👋</span>
            </h1>
            <div style={{
              padding: '6px 14px',
              borderRadius: '100px',
              backgroundColor: isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
              border: `1px solid ${isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(4px)'
            }}>
              <div style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: isActive ? '#10B981' : '#F43F5E', boxShadow: isActive ? '0 0 12px #10B981' : 'none' }} className={isActive ? 'animate-pulse' : ''} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: isActive ? '#10B981' : '#F43F5E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isActive ? 'Active Now' : 'Inactive'}
              </span>
            </div>
          </div>
          <p style={{ fontSize: '16px', color: '#94A3B8', marginTop: '8px', maxWidth: '400px', lineHeight: 1.5 }}>
            Welcome back to your workspace. Your team is currently at <span style={{ color: '#10B981', fontWeight: 800 }}>88% capacity</span> today.
          </p>
          
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'none' }} className="lg:block">
           <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                 <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Weekly Goal</p>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ position: 'relative', height: '48px', width: '48px' }}>
                       <svg viewBox="0 0 36 36" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)' }}>
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#334155" strokeWidth="3" />
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4F46E5" strokeWidth="3" strokeDasharray="75, 100" />
                       </svg>
                       <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '10px', fontWeight: 800 }}>75%</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                       <p style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>32/40h</p>
                       <p style={{ margin: 0, fontSize: '12px', color: '#94A3B8' }}>Logged this week</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '32px' }} className="xl:grid-cols-3">
        {/* Left column: check-in + stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="xl:col-span-2">
          <CheckInOutCard />
          
          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="sm:grid-cols-4">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} index={i} />
            ))}
          </div>
        </div>

        {/* Right column: recent activity sidebar */}
        <div className="xl:col-span-1">
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #E2E8F0',
            borderRadius: '28px',
            boxShadow: '0 4px 24px rgba(15,23,42,0.04)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ height: '36px', width: '36px', borderRadius: '10px', backgroundColor: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity size={18} />
                </div>
                <div>
                   <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: '15px', color: '#0F172A', margin: 0 }}>Recent Pulse</h3>
                   <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0 }}>Last 6 active days</p>
                </div>
              </div>
              <Link to="/calendar" style={{ 
                height: '32px', width: '32px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', transition: 'all 0.2s'
              }}>
                <ChevronRight size={16} />
              </Link>
            </div>
            
            <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
              {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}><Spinner /></div>
              ) : historyData?.data && Array.isArray(historyData.data) && historyData.data.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {historyData.data.map((record: any, i: number) => (
                    <div
                      key={record._id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        borderRadius: '20px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #F1F5F9',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'default'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                        e.currentTarget.style.borderColor = '#4F46E530';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(15,23,42,0.06)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.borderColor = '#F1F5F9';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        height: '40px', width: '40px', borderRadius: '12px',
                        backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        <CalendarIcon size={18} color="#64748B" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', margin: 0 }}>{formatDate(record.date, 'MMM dd, yyyy')}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                           <Clock size={12} color="#94A3B8" />
                           <span style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8' }}>
                              {record.durationMinutes ? formatDuration(record.durationMinutes) : 'Pending'}
                           </span>
                        </div>
                      </div>
                      <StatusBadge status={record.lateType} className="text-[10px] uppercase font-bold tracking-wider" />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%', color: '#94A3B8', padding: '60px 20px' }}>
                  <div style={{ height: '64px', width: '64px', borderRadius: '20px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <Target size={28} color="#94A3B8" />
                  </div>
                  <p style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Begin Your Journey</p>
                  <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '8px', lineHeight: 1.5 }}>Your attendance cycles will start appearing here once you check in.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  iconBg: string;
  index: number;
}

const StatCard = ({ label, value, sub, icon, color, bg, iconBg, index }: StatCardProps) => (
  <div
    style={{
      backgroundColor: bg,
      padding: '24px',
      borderRadius: '28px',
      border: '1px solid transparent',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'default',
      boxShadow: '0 4px 12px rgba(15,23,42,0.02)'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.borderColor = `${color}20`;
      e.currentTarget.style.boxShadow = `0 12px 32px ${color}10`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'transparent';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(15,23,42,0.02)';
    }}
  >
    <div style={{
      display: 'inline-flex', padding: '10px', borderRadius: '12px',
      backgroundColor: iconBg, color: color, marginBottom: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
    }}>
      {icon}
    </div>
    <div style={{ position: 'relative', zIndex: 1 }}>
       <h4 style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{label}</h4>
       <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '28px', fontWeight: 900, color: color, margin: 0, lineHeight: 1 }}>{value}</p>
       <p style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', marginTop: '10px', margin: '10px 0 0' }}>{sub}</p>
    </div>
    
    {/* Abstract background shape */}
    <div style={{ position: 'absolute', right: '-10%', bottom: '-10%', opacity: 0.1, color: color, transform: 'rotate(-15deg)' }}>
       {icon}
    </div>
  </div>
);

const formatDuration = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export default DashboardPage;
