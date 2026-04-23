import { PageHeader } from '@/components/layout/PageHeader';
import { StatsCards } from '@/features/admin/components/StatsCards';
import { AttendanceChart } from '@/features/admin/components/AttendanceChart';
import { Download, BarChart3, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAdminData } from '@/features/admin/hooks/useAdminData';
import { useState } from 'react';

/** Advanced Admin Dashboard — Intelligence Tier with Deep Dynamic Logic */
export const AdminDashboardPage = () => {
  const { useStats } = useAdminData();
  const { refetch, isRefetching } = useStats();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    await refetch();
    setTimeout(() => setIsSyncing(false), 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '48px' }}>
      <PageHeader
        title="QuamBaseHR Admin"
        description="Global organization oversight, real-time analytics, and trend forecasting."
      >
        <div style={{ display: 'flex', gap: '12px' }}>
           <Button variant="secondary" onClick={() => window.print()}>
             <Download size={15} />
             Export PDF
           </Button>
           <Button variant="primary" onClick={handleSync} isLoading={isSyncing || isRefetching}>
             <RefreshCw size={15} className={isSyncing || isRefetching ? 'animate-spin' : ''} />
             {isSyncing || isRefetching ? 'Syncing...' : 'Live Sync'}
           </Button>
        </div>
      </PageHeader>

      <StatsCards />

      {/* Main Chart Section */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #E2E8F0',
        borderRadius: '24px',
        boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 28px',
          borderBottom: '1px solid #F1F5F9',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ height: '36px', width: '36px', borderRadius: '10px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart3 size={18} color="#4F46E5" />
            </div>
            <div>
              <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: '16px', color: '#0F172A', margin: 0 }}>
                Workforce Trajectory
              </h3>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0' }}>Daily attendance volume and distribution</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#4F46E5', backgroundColor: '#EEF2FF', padding: '4px 12px', borderRadius: '8px' }}>LIVE ANALYTICS</div>
          </div>
        </div>
        <div style={{ padding: '28px' }}>
          <AttendanceChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
