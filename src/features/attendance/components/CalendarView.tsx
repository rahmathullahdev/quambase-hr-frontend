import { useState, useMemo } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useAttendance } from '../hooks/useAttendance';
import { DayCell } from './DayCell';
import { Button } from '@/components/ui/Button';
import { STATUS_MAP } from '@/lib/constants';
import { Spinner } from '@/components/ui/Spinner';
import { RequestForm } from './RequestForm';
import type { AttendanceRecord } from '@/types';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Main Calendar component — Intelligence Tier UI v2 (Premium Analytics) */
export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const { useCalendar } = useAttendance();
  const { data: records = [], isLoading } = useCalendar(year, month);

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentDate]);

  const recordMap = useMemo(() => {
    const map = new Map<string, AttendanceRecord>();
    records.forEach((record) => {
      map.set(record.date, record);
    });
    return map;
  }, [records]);



  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDayClick = (date: Date, record?: AttendanceRecord) => {
    setSelectedDate(date);
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="xl:grid-cols-4">
      {/* Main Calendar Body */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #E2E8F0',
        borderRadius: '32px',
        padding: '24px',
        boxShadow: '0 10px 40px rgba(15,23,42,0.04)',
        position: 'relative'
      }} className="xl:col-span-4">
        {/* Header Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', fontFamily: '"Plus Jakarta Sans", sans-serif', margin: 0, letterSpacing: '-0.02em' }}>
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <p style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600, marginTop: '4px' }}>Analyze your work patterns and trends</p>
          </div>
          
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: '#F8FAFC', padding: '6px', borderRadius: '16px', border: '1px solid #E2E8F0'
          }}>
            <button
              onClick={handlePrevMonth}
              style={{ height: '36px', width: '36px', borderRadius: '10px', color: '#64748B', background: '#ffffff', border: '1px solid #E2E8F0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              style={{ padding: '0 16px', height: '36px', borderRadius: '10px', color: '#0F172A', fontSize: '13px', fontWeight: 800, background: '#ffffff', border: '1px solid #E2E8F0', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
            >
              Today
            </button>
            <button
              onClick={handleNextMonth}
              style={{ height: '36px', width: '36px', borderRadius: '10px', color: '#64748B', background: '#ffffff', border: '1px solid #E2E8F0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Calendar Grid Container */}
        <div style={{
          border: '1px solid #F1F5F9', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#ffffff', position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.01)'
        }}>
          {isLoading && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 10,
              backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Spinner size="lg" />
            </div>
          )}
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                style={{
                  padding: '16px 0', textAlign: 'center', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.15em'
                }}
              >
                {day}
              </div>
            ))}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {days.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const record = recordMap.get(dateStr);
              
              return (
                <DayCell
                  key={day.toISOString()}
                  date={day}
                  isCurrentMonth={isSameMonth(day, currentDate)}
                  isToday={isSameDay(day, new Date())}
                  record={record}
                  onClick={handleDayClick}
                />
              );
            })}
          </div>
        </div>

        {/* Advanced Legend */}
        <div style={{ 
          marginTop: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', 
          backgroundColor: '#F8FAFC', padding: '16px 24px', borderRadius: '20px', border: '1px solid #F1F5F9'
        }}>
          {Object.entries(STATUS_MAP).map(([key, config]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ height: '10px', width: '24px', borderRadius: '10px', backgroundColor: config.color }} />
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{config.label}</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ height: '10px', width: '24px', borderRadius: '10px', backgroundColor: '#ffffff', border: '1px solid #E2E8F0' }} />
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Empty</span>
          </div>
        </div>
      </div>

      {/* Day Details Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedDate ? format(selectedDate, 'EEEE, MMMM do, yyyy') : 'Day Details'}
      >
        {selectedDate && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {!selectedRecord ? (
              <div style={{
                backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '20px', textAlign: 'center'
              }}>
                <div style={{
                  height: '64px', width: '64px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1px solid #E2E8F0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#94A3B8'
                }}>
                  <CalendarIcon size={28} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Log Not Found</h4>
                <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px', lineHeight: 1.5 }}>
                  You haven't recorded attendance for this day yet. Need to submit a retrospective request?
                </p>
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                  <RequestForm date={format(selectedDate, 'yyyy-MM-dd')} onSuccess={() => setIsModalOpen(false)} />
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ backgroundColor: '#F8FAFC', padding: '12px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                    <p style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Clock In</p>
                    <p style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {selectedRecord.checkIn ? format(new Date(selectedRecord.checkIn), 'hh:mm a') : '--'}
                    </p>
                  </div>
                  <div style={{ backgroundColor: '#F8FAFC', padding: '12px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                    <p style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Clock Out</p>
                    <p style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {selectedRecord.checkOut ? format(new Date(selectedRecord.checkOut), 'hh:mm a') : '--'}
                    </p>
                  </div>
                 </div>
                 
                 <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '24px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 600 }}>Performance Badge</span>
                        <div style={{
                          fontSize: '11px', fontWeight: 800, padding: '6px 12px', borderRadius: '10px',
                          backgroundColor: (STATUS_MAP[selectedRecord.lateType] || STATUS_MAP.absent).color + '15',
                          color: (STATUS_MAP[selectedRecord.lateType] || STATUS_MAP.absent).color,
                          border: `1px solid ${(STATUS_MAP[selectedRecord.lateType] || STATUS_MAP.absent).color}30`,
                          textTransform: 'uppercase', letterSpacing: '0.05em'
                        }}>
                          {(STATUS_MAP[selectedRecord.lateType] || STATUS_MAP.absent).label}
                        </div>
                     </div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 600 }}>Active Span</span>
                        <span style={{ fontSize: '14px', color: '#0F172A', fontWeight: 800 }}>
                          {selectedRecord.durationMinutes ? `${Math.floor(selectedRecord.durationMinutes / 60)}h ${selectedRecord.durationMinutes % 60}m` : '0h 0m'}
                        </span>
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                        <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 600 }}>Journal Remarks</span>
                        <p style={{ fontSize: '14px', color: '#0F172A', fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
                          {selectedRecord.remarks || 'No detailed remarks recorded for this session.'}
                        </p>
                     </div>
                 </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
