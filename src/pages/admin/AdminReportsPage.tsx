import { useState, useEffect } from 'react';
import { useAdminData } from '@/features/admin/hooks/useAdminData';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Download, FileText, Search, Filter, RefreshCw, ChevronLeft, ChevronRight, Hash, FileWarning, Clock, Users, ShieldCheck, Activity } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';
import { formatDate, formatTime, formatDuration } from '@/lib/utils';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/shared/EmptyState';

/** Advanced Admin Reports Page — Intelligence Tier UI v3 (Premium Analytics) */
export const AdminReportsPage = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    department: '',
    employeeId: '',
  });

  // Temporary state for the inputs to avoid live-refetching on every keystroke
  const [tempFilters, setTempFilters] = useState({ ...filters });

  const { useAllAttendance, useDepartments, useStats } = useAdminData();
  const departments = useDepartments();
  const { data: stats } = useStats();
  
  const { data, isLoading, isRefetching } = useAllAttendance(page, 15, filters);

  const handleApply = () => {
    setFilters({ ...tempFilters });
    setPage(1);
  };

  const handleReset = () => {
    const reset = { startDate: '', endDate: '', department: '', employeeId: '' };
    setTempFilters(reset);
    setFilters(reset);
    setPage(1);
  };

  const handleDownload = (type: 'csv' | 'pdf') => {
    console.log(`Downloading ${type} report with filters:`, filters);
  };

  const records = (data as any)?.data && Array.isArray((data as any).data) ? (data as any).data : [];
  const total = (data as any)?.total || 0;
  const totalPages = (data as any)?.totalPages || 1;

  // Calculate some analytics for the summary bar
  const avgDuration = records.length > 0 
    ? Math.round(records.reduce((acc: number, curr: any) => acc + (curr.durationMinutes || 0), 0) / records.length)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '48px' }}>
      <PageHeader
        title="QuamBaseHR Reports"
        description="Global orchestration of attendance records, duration analytics, and compliance logs."
      >
        <div style={{ display: 'flex', gap: '12px' }}>
           <Button variant="secondary" onClick={handleReset}>
             <RefreshCw size={15} />
             Reset
           </Button>
           <div style={{ display: 'flex', backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '2px' }}>
              <button 
                onClick={() => handleDownload('csv')}
                style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', backgroundColor: 'transparent', color: '#64748B', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <FileText size={14} /> CSV
              </button>
              <button 
                onClick={() => handleDownload('pdf')}
                style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', backgroundColor: 'transparent', color: '#64748B', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Download size={14} /> PDF
              </button>
           </div>
        </div>
      </PageHeader>

      {/* Intelligence Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
         {[
           { label: 'Total Logs', value: total, icon: <Activity size={18} color="#4F46E5" />, bg: '#EEF2FF' },
           { label: 'Avg Span', value: formatDuration(avgDuration), icon: <Clock size={18} color="#10B981" />, bg: '#F0FDF4' },
           { label: 'Active Personnel', value: stats?.presentToday || 0, icon: <Users size={18} color="#0F172A" />, bg: '#F8FAFC' },
           { label: 'Verified Rate', value: '100%', icon: <ShieldCheck size={18} color="#6366F1" />, bg: '#EEF2FF' },
         ].map((stat, i) => (
           <div key={i} style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}>
              <div style={{ height: '44px', width: '44px', borderRadius: '12px', backgroundColor: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <div>
                 <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
                 <p style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Advanced Filter Architecture */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #E2E8F0',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, padding: '12px', opacity: 0.03 }}>
           <Filter size={100} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ height: '32px', width: '32px', borderRadius: '8px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Search size={16} color="#4F46E5" />
          </div>
          <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Filter Intelligence</h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <Input
            label="Search Identity"
            placeholder="Name or Employee ID"
            value={tempFilters.employeeId}
            onChange={(e) => setTempFilters({ ...tempFilters, employeeId: e.target.value })}
          />
          <Select
            label="Department"
            options={['All Departments', ...departments].map(d => ({ label: d, value: d === 'All Departments' ? '' : d }))}
            value={tempFilters.department}
            onChange={(e) => setTempFilters({ ...tempFilters, department: e.target.value })}
          />
          <Input
            type="date"
            label="From Date"
            value={tempFilters.startDate}
            onChange={(e) => setTempFilters({ ...tempFilters, startDate: e.target.value })}
          />
          <Input
            type="date"
            label="To Date"
            value={tempFilters.endDate}
            onChange={(e) => setTempFilters({ ...tempFilters, endDate: e.target.value })}
          />
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
             <Button 
                variant="primary" 
                style={{ width: '100%', height: '42px', borderRadius: '12px', fontWeight: 800 }} 
                onClick={handleApply}
                isLoading={isRefetching}
             >
                Apply Analysis
             </Button>
          </div>
        </div>
      </div>

      {/* Advanced Results Engine */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #E2E8F0',
        borderRadius: '24px',
        boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ height: '36px', width: '36px', borderRadius: '10px', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E2E8F0' }}>
              <FileText size={18} color="#64748B" />
            </div>
            <div>
               <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: '16px', color: '#0F172A', margin: 0 }}>Master Log</h3>
               <p style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified Records Repository</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             {isRefetching && <Spinner size="sm" />}
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '13px', fontWeight: 600 }}>
                <Hash size={14} />
                Total: {total}
             </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          {isLoading ? (
            <div style={{ padding: '80px', display: 'flex', justifyContent: 'center' }}>
              <Spinner />
            </div>
          ) : records.length === 0 ? (
            <EmptyState
              icon={<FileWarning size={40} color="#94A3B8" />}
              title="No Records Found"
              description="Adjust your filters or sync with the server to retrieve latest logs."
              className="py-24"
            />
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', whiteSpace: 'nowrap' }}>
              <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <tr>
                  <th style={{ padding: '16px 28px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Member Profile</th>
                  <th style={{ padding: '16px 28px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Event Date</th>
                  <th style={{ padding: '16px 28px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Check In</th>
                  <th style={{ padding: '16px 28px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Check Out</th>
                  <th style={{ padding: '16px 28px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Work Span</th>
                  <th style={{ padding: '16px 28px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Metric</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record: any) => {
                  const durationPercent = Math.min(Math.round(((record.durationMinutes || 0) / 480) * 100), 100);
                  const durationColor = record.durationMinutes < 240 ? '#DC2626' : record.durationMinutes < 480 ? '#D97706' : '#16A34A';
                  
                  return (
                    <tr 
                      key={record._id} 
                      style={{ borderBottom: '1px solid #F1F5F9', transition: 'all 0.15s ease' }} 
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F8FAFC')} 
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '16px 28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <Avatar name={record.userId?.name || 'User'} size="sm" />
                          <div>
                            <p style={{ fontWeight: 800, color: '#0F172A', margin: 0 }}>{record.userId?.name || 'Unknown'}</p>
                            <p style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', margin: 0 }}>{record.userId?.employeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 28px', color: '#0F172A', fontWeight: 700 }}>{formatDate(record.date, 'MMM dd, yyyy')}</td>
                      <td style={{ padding: '16px 28px', color: '#059669', fontWeight: 700 }}>{record.checkIn ? formatTime(record.checkIn) : '--'}</td>
                      <td style={{ padding: '16px 28px', color: '#4F46E5', fontWeight: 700 }}>{record.checkOut ? formatTime(record.checkOut) : '--'}</td>
                      <td style={{ padding: '16px 28px' }}>
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '120px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: '#475569' }}>
                               <span>{record.durationMinutes ? formatDuration(record.durationMinutes) : '--'}</span>
                               <span style={{ color: durationColor }}>{durationPercent}%</span>
                            </div>
                            <div style={{ height: '4px', width: '100%', backgroundColor: '#E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
                               <div style={{ height: '100%', width: `${durationPercent}%`, backgroundColor: durationColor, borderRadius: '10px' }} />
                            </div>
                         </div>
                      </td>
                      <td style={{ padding: '16px 28px' }}>
                        <StatusBadge status={record.lateType} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Professional Pagination Engine */}
        <div style={{ padding: '20px 28px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
           <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
              Showing Page <span style={{ color: '#0F172A' }}>{page}</span> of {totalPages}
           </span>
           <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
                style={{ 
                  height: '36px', padding: '0 12px', borderRadius: '10px', border: '1px solid #E2E8F0', backgroundColor: '#ffffff',
                  display: 'flex', alignItems: 'center', gap: '8px', cursor: page <= 1 ? 'not-allowed' : 'pointer', opacity: page <= 1 ? 0.5 : 1,
                  fontSize: '13px', fontWeight: 700, color: '#0F172A', transition: 'all 0.2s'
                }}
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <button 
                disabled={page >= totalPages}
                onClick={() => setPage(p => p + 1)}
                style={{ 
                  height: '36px', padding: '0 12px', borderRadius: '10px', border: '1px solid #E2E8F0', backgroundColor: '#ffffff',
                  display: 'flex', alignItems: 'center', gap: '8px', cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.5 : 1,
                  fontSize: '13px', fontWeight: 700, color: '#0F172A', transition: 'all 0.2s'
                }}
              >
                Next <ChevronRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;
