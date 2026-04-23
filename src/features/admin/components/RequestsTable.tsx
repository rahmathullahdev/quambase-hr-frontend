import { useState, useEffect } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { Check, X, Edit, FileWarning, Search, Filter, RefreshCw } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { ApprovalModal } from './ApprovalModal';
import { formatDate } from '@/lib/utils';
import type { LeaveRequest } from '@/types';

/** Advanced Admin Requests Table — Fully Dynamic with Search & Counts */
export const RequestsTable = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  const { useRequests, approveRequest } = useAdminData();
  
  // Dynamic data fetching with status and search filters
  const { data, isLoading, isRefetching, refetch } = useRequests(page, 10, { 
    status: statusFilter,
    // Note: Search implementation would ideally be on the backend, 
    // for now we'll simulate the dynamic feel.
  });

  // Client-side search simulation if backend doesn't support it yet
  const filteredData = (data?.data as any)?.filter((req: any) => 
    req.userId?.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    req.userId?.employeeId?.toLowerCase().includes(debouncedSearch.toLowerCase())
  ) || [];

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'reject' | 'modify';
    request: LeaveRequest | null;
  }>({
    isOpen: false,
    type: 'reject',
    request: null,
  });

  const openModal = (type: 'reject' | 'modify', request: LeaveRequest) => {
    setModalState({ isOpen: true, type, request });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: 'reject', request: null });
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Dynamic Toolbar */}
      <div style={{ 
        padding: '24px', 
        borderBottom: '1px solid #F1F5F9', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: '16px', color: '#0F172A', margin: 0 }}>
                Live Queue
              </h3>
              {isRefetching && <RefreshCw size={12} className="animate-spin text-accent-primary" />}
           </div>
           
           <div style={{ display: 'flex', padding: '4px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              {(['pending', 'approved', 'rejected'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setPage(1); }}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    backgroundColor: statusFilter === s ? '#ffffff' : 'transparent',
                    color: statusFilter === s ? '#4F46E5' : '#94A3B8',
                    boxShadow: statusFilter === s ? '0 2px 8px rgba(15,23,42,0.06)' : 'none',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {s}
                  {statusFilter === s && (data as any)?.total !== undefined && (
                    <span style={{ fontSize: '10px', opacity: 0.6 }}>({(data as any).total})</span>
                  )}
                </button>
              ))}
           </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
           <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input 
                type="text" 
                placeholder="Find employee..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  height: '36px', paddingLeft: '36px', paddingRight: '12px', borderRadius: '10px',
                  border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none', width: '220px',
                  transition: 'border-color 0.15s'
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#4F46E5')}
                onBlur={e => (e.currentTarget.style.borderColor = '#E2E8F0')}
              />
           </div>
           <button 
             onClick={() => refetch()}
             title="Reload Queue"
             style={{
                height: '36px', width: '36px', borderRadius: '10px', border: '1px solid #E2E8F0',
                backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B',
                cursor: 'pointer'
             }}
           >
              <RefreshCw size={15} className={isRefetching ? 'animate-spin' : ''} />
           </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowX: 'auto' }}>
        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px' }}>
            <Spinner />
          </div>
        ) : filteredData.length === 0 ? (
          <EmptyState
            icon={<FileWarning size={40} color="#94A3B8" />}
            title="Empty Queue"
            description={searchQuery ? `No members found matching "${searchQuery}"` : `No ${statusFilter} requests currently active.`}
            className="py-24"
          />
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '14px', whiteSpace: 'nowrap' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Member</th>
                <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Department</th>
                <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Target Date</th>
                <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Category</th>
                <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Justification</th>
                <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((req: any) => (
                <tr 
                  key={req._id} 
                  style={{ borderBottom: '1px solid #F1F5F9', transition: 'all 0.1s ease' }} 
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F8FAFC')} 
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <Avatar name={req.userId?.name || 'User'} size="sm" />
                      <div>
                        <p style={{ fontWeight: 800, color: '#0F172A', margin: 0, fontSize: '14px' }}>{req.userId?.name || 'Unknown'}</p>
                        <p style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', margin: 0 }}>{req.userId?.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', backgroundColor: '#F1F5F9', padding: '4px 10px', borderRadius: '6px' }}>
                      {req.userId?.department || 'General'}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', color: '#0F172A', fontWeight: 700 }}>{formatDate(req.date, 'MMM dd, yyyy')}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <StatusBadge status={req.type} />
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', color: '#64748B', fontSize: '13px', lineHeight: 1.4 }} title={req.reason}>
                      {req.reason}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    {req.status === 'pending' ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          style={{
                            height: '34px', width: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: '10px', color: '#4F46E5', backgroundColor: '#EEF2FF', border: '1px solid #E0E7FF', cursor: 'pointer', transition: 'all 0.2s'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E0E7FF'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#EEF2FF'; e.currentTarget.style.transform = 'scale(1)'; }}
                          onClick={() => openModal('modify', req)}
                          title="Modify"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          style={{
                            height: '34px', width: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: '10px', color: '#DC2626', backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', cursor: 'pointer', transition: 'all 0.2s'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FEE2E2'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FEF2F2'; e.currentTarget.style.transform = 'scale(1)'; }}
                          onClick={() => openModal('reject', req)}
                          title="Reject"
                        >
                          <X size={15} />
                        </button>
                        <Button
                          variant="primary"
                          size="sm"
                          style={{ height: '34px', minWidth: '90px', borderRadius: '10px', fontSize: '12px' }}
                          onClick={() => approveRequest.mutate(req._id)}
                          isLoading={approveRequest.isPending}
                        >
                          {!approveRequest.isPending && <Check size={14} style={{ marginRight: '6px' }} />}
                          Approve
                        </Button>
                      </div>
                    ) : (
                      <StatusBadge status={req.status as any} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalState.request && (
        <ApprovalModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          type={modalState.type}
          request={modalState.request}
        />
      )}
    </div>
  );
};
