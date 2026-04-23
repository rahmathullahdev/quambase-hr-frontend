import { PageHeader } from '@/components/layout/PageHeader';
import { RequestsTable } from '@/features/admin/components/RequestsTable';

/** Admin Request Approvals Page — Overhauled with Advanced White Theme */
export const AdminApprovalsPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '48px' }}>
      <PageHeader 
        title="QuamBaseHR Approvals" 
        description="Global orchestration of employee leave, permission, and half-day requests."
      />

      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #E2E8F0',
        borderRadius: '24px',
        boxShadow: '0 4px 24px rgba(15,23,42,0.04)',
        padding: '8px'
      }}>
        <RequestsTable />
      </div>
    </div>
  );
};

export default AdminApprovalsPage;
