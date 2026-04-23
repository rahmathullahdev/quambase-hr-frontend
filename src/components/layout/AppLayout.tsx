import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Spinner } from '@/components/ui/Spinner';
import { NotifPanel } from '@/features/notifications/components/NotifPanel';

/** Main application layout — white-based theme */
export const AppLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F8FAFC', overflow: 'hidden', color: '#0F172A' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflow: 'hidden', position: 'relative' }}>
        <Topbar />

        <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '1.5rem 2rem', backgroundColor: '#F8FAFC' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', height: '100%' }}>
            <Suspense
              fallback={
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '0.75rem' }}>
                  <Spinner size="lg" />
                  <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Loading…</p>
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>

        <NotifPanel />
      </div>
    </div>
  );
};
