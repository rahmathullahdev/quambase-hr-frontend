import { useState } from 'react';
import { useAttendance } from '@/features/attendance/hooks/useAttendance';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { RequestForm } from '@/features/attendance/components/RequestForm';
import { format } from 'date-fns';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { DateChip } from '@/components/shared/DateChip';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { Spinner } from '@/components/ui/Spinner';
import { Plus, X, ListTodo, Clock, CheckCircle2, AlertCircle, Sparkles, Send, Zap, Info } from 'lucide-react';
import type { LeaveRequest } from '@/types';

/** Leave Requests Page — Intelligence Tier UI v2 (Premium Management) */
export const RequestsPage = () => {
  const [page, setPage] = useState(1);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState<string | null>(null);
  
  const { useRequests, cancelRequest } = useAttendance();
  const { data, isLoading } = useRequests(page, 15);

  const pendingRequests = (data?.data as any)?.filter((r: any) => r.status === 'pending') || [];
  const pastRequests = (data?.data as any)?.filter((r: any) => r.status !== 'pending') || [];

  const stats = [
    { label: 'Active', value: pendingRequests.length, icon: <Clock size={16} />, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Approved', value: pastRequests.filter((r: any) => r.status === 'approved').length, icon: <CheckCircle2 size={16} />, color: '#10B981', bg: '#F0FDF4' },
    { label: 'Modified', value: pastRequests.filter((r: any) => r.status === 'modified').length, icon: <Zap size={16} />, color: '#6366F1', bg: '#EEF2FF' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '48px' }}>
      <PageHeader 
        title="QuamBaseHR Requests" 
        description="Monitor your professional request status and submit new authorizations."
      >
        <Button 
          onClick={() => setIsNewModalOpen(true)}
          style={{ height: '42px', borderRadius: '12px', padding: '0 20px', fontWeight: 800, background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)', border: 'none', boxShadow: '0 8px 16px rgba(79,70,229,0.2)' }}
        >
          <Plus size={18} />
          Launch New Request
        </Button>
      </PageHeader>

      {/* Request Analytics Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
         {stats.map((s) => (
           <div key={s.label} style={{ 
             backgroundColor: '#ffffff', border: '1px solid #E2E8F0', padding: '20px 24px', borderRadius: '24px',
             display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 12px rgba(15,23,42,0.02)'
           }}>
              <div style={{ height: '40px', width: '40px', borderRadius: '12px', backgroundColor: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 {s.icon}
              </div>
              <div>
                 <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</p>
                 <p style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: '#0F172A' }}>{s.value}</p>
              </div>
           </div>
         ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="animate-slide-up">
        
        {/* ─── High-Fidelity Pending Section ─── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '0 8px' }}>
             <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: '18px', color: '#0F172A', margin: 0 }}>Active Tracking</h3>
             <span style={{ backgroundColor: '#F1F5F9', color: '#64748B', fontSize: '12px', fontWeight: 800, padding: '2px 10px', borderRadius: '100px' }}>
                {pendingRequests.length} Running
             </span>
          </div>

          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}><Spinner /></div>
          ) : pendingRequests.length === 0 ? (
            <div style={{
              padding: '60px 24px', textAlign: 'center', border: '1px dashed #E2E8F0', borderRadius: '28px', backgroundColor: '#F8FAFC'
            }}>
              <Sparkles size={32} color="#94A3B8" style={{ margin: '0 auto 16px' }} />
              <p style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>All Clear</p>
              <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '8px' }}>You don't have any requests awaiting approval.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '20px' }} className="lg:grid-cols-2">
               {pendingRequests.map((req: LeaveRequest) => (
                 <div key={req._id} style={{
                    backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '28px', padding: '24px',
                    display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 10px 20px rgba(15,23,42,0.03)',
                    position: 'relative', overflow: 'hidden'
                 }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, padding: '16px', opacity: 0.05 }}>
                       <Send size={60} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <DateChip date={req.date} />
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                          <span style={{ fontSize: '11px', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Review</span>
                       </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <div style={{ padding: '8px 16px', backgroundColor: '#EEF2FF', color: '#4F46E5', borderRadius: '12px', fontSize: '12px', fontWeight: 800, border: '1px solid #E0E7FF' }}>
                          {req.type.replace('_', ' ').toUpperCase()}
                       </div>
                       <p style={{ margin: 0, fontSize: '13px', color: '#64748B', fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {req.reason}
                       </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
                       <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontSize: '10px', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>Submission Date</p>
                          <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{format(new Date(req.createdAt), 'MMM dd, hh:mm a')}</p>
                       </div>
                       <Button 
                          variant="secondary" 
                          size="sm" 
                          style={{ height: '36px', borderRadius: '10px', fontSize: '11px', color: '#EF4444', border: '1px solid #FEE2E2', background: '#FEF2F2' }}
                          onClick={() => setRequestToCancel(req._id)}
                       >
                          <X size={14} /> Cancel Request
                       </Button>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>

        {/* ─── Premium History Section ─── */}
        <div style={{
          backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '32px',
          boxShadow: '0 4px 24px rgba(15,23,42,0.04)', overflow: 'hidden'
        }}>
          <div style={{ padding: '28px 32px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ height: '36px', width: '36px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <ListTodo size={18} color="#64748B" />
            </div>
            <div>
               <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: '16px', color: '#0F172A', margin: 0 }}>Request Archive</h3>
               <p style={{ fontSize: '12px', color: '#94A3B8', margin: '4px 0 0' }}>Comprehensive history of your authorized absence requests.</p>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '64px' }}><Spinner /></div>
            ) : pastRequests.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8' }}>
                 <Info size={32} style={{ margin: '0 auto 16px' }} />
                 <p style={{ fontSize: '14px', fontWeight: 600 }}>No history logs yet</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', whiteSpace: 'nowrap' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ padding: '16px 32px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Date Point</th>
                    <th style={{ padding: '16px 32px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Category</th>
                    <th style={{ padding: '16px 32px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Verification Status</th>
                    <th style={{ padding: '16px 32px', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Official Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {pastRequests.map((req: LeaveRequest) => (
                    <tr key={req._id} style={{ borderBottom: '1px solid #F8FAFC', transition: 'all 0.1s' }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FDFDFD')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                      <td style={{ padding: '20px 32px' }}>
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <DateChip date={req.date} />
                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#CBD5E1' }}>SUBMITTED {format(new Date(req.createdAt), 'MMM dd')}</span>
                         </div>
                      </td>
                      <td style={{ padding: '20px 32px' }}>
                         <StatusBadge status={req.type} className="text-[10px] font-bold" />
                      </td>
                      <td style={{ padding: '20px 32px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <StatusBadge status={req.status as any} className="px-3" />
                         </div>
                      </td>
                      <td style={{ padding: '20px 32px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <p style={{ margin: 0, fontSize: '13px', color: '#64748B', fontWeight: 500 }}>{req.reviewNote || 'Standard approval'}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isNewModalOpen} 
        onClose={() => setIsNewModalOpen(false)}
        title="Authorization Desk"
      >
        <RequestForm 
          date={format(new Date(), 'yyyy-MM-dd')}
          onSuccess={() => setIsNewModalOpen(false)} 
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!requestToCancel}
        onClose={() => setRequestToCancel(null)}
        title="Revoke Request"
        message="Are you sure you want to revoke this pending authorization? This will remove it from the approval queue immediately."
        confirmLabel="Confirm Revoke"
        isLoading={cancelRequest.isPending}
        onConfirm={() => {
          if (requestToCancel) {
            cancelRequest.mutate(requestToCancel, {
              onSuccess: () => setRequestToCancel(null)
            });
          }
        }}
      />
    </div>
  );
};

export default RequestsPage;
