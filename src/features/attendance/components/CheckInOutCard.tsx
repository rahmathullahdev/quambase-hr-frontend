import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Clock, LogIn, LogOut, CheckCircle, Timer, ShieldCheck, MapPin } from 'lucide-react';
import { useCheckIn } from '../hooks/useCheckIn';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatTime, formatDuration } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';
import { classifyLate } from '../utils/classifyLate';

/** Premium CheckInOutCard — High Fidelity Interactive Station */
export const CheckInOutCard = () => {
  const { todayRecord, isLoading, checkIn, isCheckingIn, checkOut, isCheckingOut } = useCheckIn();
  const [remarks, setRemarks] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '32px', padding: '48px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner />
      </div>
    );
  }

  const isCheckedIn = !!todayRecord?.checkIn;
  const isCheckedOut = !!todayRecord?.checkOut;

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #E2E8F0',
      borderRadius: '32px',
      boxShadow: '0 10px 30px rgba(15,23,42,0.04)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Visual Status Indicator Strip */}
      <div style={{
        height: '6px',
        width: '100%',
        backgroundColor: isCheckedOut ? '#10B981' : isCheckedIn ? '#6366F1' : '#F1F5F9'
      }} />

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
           <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                 <div style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: isCheckedOut ? '#10B981' : isCheckedIn ? '#6366F1' : '#CBD5E1', boxShadow: isCheckedIn && !isCheckedOut ? '0 0 12px #6366F1' : 'none' }} />
                 <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {isCheckedOut ? 'Shift Completed' : isCheckedIn ? 'System Active' : 'System Ready'}
                 </span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: 0, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                 Attendance Station
              </h2>
           </div>
           
           {!isCheckedIn && (
              <div style={{
                backgroundColor: classifyLate(currentTime) === 'on_time' ? '#F0FDF4' : '#FFF7ED',
                border: `1px solid ${classifyLate(currentTime) === 'on_time' ? '#BBF7D0' : '#FFEDD5'}`,
                padding: '6px 12px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ height: '6px', width: '6px', borderRadius: '50%', backgroundColor: classifyLate(currentTime) === 'on_time' ? '#10B981' : '#F59E0B' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, color: classifyLate(currentTime) === 'on_time' ? '#16A34A' : '#D97706', textTransform: 'uppercase' }}>
                  {classifyLate(currentTime).replace('_', ' ')}
                </span>
              </div>
           )}
           
           <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{format(currentTime, 'MMMM do, yyyy')}</p>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>{format(currentTime, 'EEEE')}</p>
           </div>
        </div>

        {/* Central Clock Display */}
        <div style={{
          backgroundColor: '#F8FAFC',
          borderRadius: '20px',
          padding: '20px 16px',
          textAlign: 'center',
          border: '1px solid #E2E8F0',
          marginBottom: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}>
           <div style={{ position: 'absolute', top: 0, right: 0, padding: '12px', opacity: 0.05 }}>
              <Clock size={80} />
           </div>
           
           <h3 style={{ 
              fontSize: '44px', 
              fontWeight: 900, 
              color: '#0F172A', 
              fontFamily: '"Plus Jakarta Sans", sans-serif', 
              margin: 0, 
              letterSpacing: '-0.04em',
              lineHeight: 1
           }}>
              {format(currentTime, 'hh:mm')}
              <span style={{ fontSize: '20px', color: '#94A3B8', marginLeft: '6px' }}>{format(currentTime, 'ss')}</span>
              <span style={{ fontSize: '20px', color: '#4F46E5', marginLeft: '10px', fontWeight: 800 }}>{format(currentTime, 'a')}</span>
           </h3>
           
           <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <ShieldCheck size={13} color="#10B981" />
                 <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>Verified Session</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <MapPin size={13} color="#6366F1" />
                 <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>HQ Workspace</span>
              </div>
           </div>
        </div>

        {/* Grid Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
           {[
              { label: 'Check In', value: todayRecord?.checkIn ? formatTime(todayRecord.checkIn) : '--:--', color: '#0F172A' },
              { label: 'Check Out', value: todayRecord?.checkOut ? formatTime(todayRecord.checkOut) : '--:--', color: '#0F172A' },
              { label: 'Live Span', value: todayRecord?.durationMinutes ? formatDuration(todayRecord.durationMinutes) : '--', color: '#4F46E5' },
           ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center', padding: '12px', backgroundColor: '#ffffff', border: '1px solid #F1F5F9', borderRadius: '14px' }}>
                 <p style={{ margin: 0, fontSize: '9px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</p>
                 <p style={{ margin: '6px 0 0', fontSize: '16px', fontWeight: 800, color: stat.color }}>{stat.value}</p>
              </div>
           ))}
        </div>

        {/* Interaction Zone */}
        {!isCheckedOut ? (
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <Input
                placeholder="Session notes (optional)..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                disabled={isCheckingIn || isCheckingOut}
                style={{ height: '40px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '13px' }}
              />
              
              <div style={{ display: 'flex', gap: '12px' }}>
                {!isCheckedIn ? (
                  <Button
                    style={{ flex: 1, height: '48px', borderRadius: '14px', fontSize: '15px', fontWeight: 800, background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)', boxShadow: '0 6px 16px rgba(79,70,229,0.2)' }}
                    onClick={() => checkIn(remarks)}
                    isLoading={isCheckingIn}
                  >
                    <LogIn size={18} />
                    Initiate Check In
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    style={{ flex: 1, height: '48px', borderRadius: '14px', fontSize: '15px', fontWeight: 800, background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', boxShadow: '0 6px 16px rgba(16,185,129,0.2)' }}
                    onClick={() => checkOut(remarks)}
                    isLoading={isCheckingOut}
                  >
                    <LogOut size={18} />
                    Confirm Check Out
                  </Button>
                )}
              </div>
           </div>
        ) : (
           <div style={{
              padding: '24px',
              backgroundColor: '#F0FDF4',
              borderRadius: '24px',
              border: '1px dotted #10B981',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
           }}>
              <div style={{ height: '48px', width: '48px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16,185,129,0.1)' }}>
                 <CheckCircle size={24} color="#10B981" />
              </div>
              <div style={{ textAlign: 'center' }}>
                 <p style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#064E3B' }}>Session Successfully Archived</p>
                 <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#059669', fontWeight: 600 }}>Your logs have been synced with HQ. Enjoy your evening!</p>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};
