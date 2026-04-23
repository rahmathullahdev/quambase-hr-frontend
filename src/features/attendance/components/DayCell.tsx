import { cn } from '@/lib/utils';
import type { AttendanceRecord } from '@/types';
import { STATUS_MAP } from '@/lib/constants';
import { formatTime } from '@/lib/utils';
import { Clock, CheckCircle2, AlertCircle, Zap } from 'lucide-react';

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  record?: AttendanceRecord;
  onClick: (date: Date, record?: AttendanceRecord) => void;
}

/** Individual square cell in the calendar grid — High Fidelity v2 */
export const DayCell = ({ date, isCurrentMonth, isToday, record, onClick }: DayCellProps) => {
  const dayNumber = date.getDate();
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  let statusConfig = null;
  if (record) {
    statusConfig = STATUS_MAP[record.lateType] || STATUS_MAP.absent;
  } else if (!isWeekend && isCurrentMonth && date < new Date() && !isToday) {
    statusConfig = STATUS_MAP.absent;
  }

  return (
    <div
      onClick={() => onClick(date, record)}
      style={{
        height: '100px',
        borderBottom: '1px solid #F1F5F9',
        borderRight: '1px solid #F1F5F9',
        padding: '8px',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: !isCurrentMonth ? '#F8FAFC' : isToday ? '#ffffff' : '#ffffff',
        position: 'relative',
        zIndex: isToday ? 2 : 1,
        boxShadow: isToday ? 'inset 0 0 0 2px #4F46E5, 0 10px 20px rgba(79,70,229,0.08)' : 'none'
      }}
      onMouseEnter={e => {
        if (isCurrentMonth) {
          e.currentTarget.style.backgroundColor = '#F8FAFC';
          e.currentTarget.style.zIndex = '5';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(15,23,42,0.08)';
          e.currentTarget.style.transform = 'scale(1.02)';
        }
      }}
      onMouseLeave={e => {
        if (isCurrentMonth) {
          e.currentTarget.style.backgroundColor = isToday ? '#ffffff' : '#ffffff';
          e.currentTarget.style.zIndex = isToday ? '2' : '1';
          e.currentTarget.style.boxShadow = isToday ? 'inset 0 0 0 2px #4F46E5, 0 10px 20px rgba(79,70,229,0.08)' : 'none';
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 900,
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            backgroundColor: isToday ? '#4F46E5' : 'transparent',
            color: isToday ? '#ffffff' : !isCurrentMonth ? '#CBD5E1' : '#0F172A',
            fontFamily: '"Plus Jakarta Sans", sans-serif'
          }}
        >
          {dayNumber}
        </span>

        {statusConfig && (
          <div style={{
             height: '6px',
             width: '24px',
             borderRadius: '10px',
             backgroundColor: statusConfig.color,
             opacity: isCurrentMonth ? 1 : 0.3
          }} />
        )}
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {record ? (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {record.checkIn && (
               <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={10} color="#94A3B8" />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>
                    {formatTime(record.checkIn)}
                  </span>
               </div>
            )}
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 8px',
              borderRadius: '8px',
              backgroundColor: statusConfig?.color + '10',
              border: `1px solid ${statusConfig?.color}20`,
              color: statusConfig?.color,
              width: 'fit-content',
              maxWidth: '100%'
            }}>
               <span style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {statusConfig?.label}
               </span>
            </div>
          </div>
        ) : !isWeekend && isCurrentMonth && date < new Date() && !isToday ? (
           <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EF4444', opacity: 0.8 }}>
              <AlertCircle size={12} />
              <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>Missing</span>
           </div>
        ) : null}
      </div>

      {/* Subtle weekend shading */}
      {isWeekend && isCurrentMonth && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(241,245,249,0.3)', pointerEvents: 'none', zIndex: -1 }} />
      )}
    </div>
  );
};
