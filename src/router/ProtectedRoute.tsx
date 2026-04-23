import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Spinner } from '@/components/ui/Spinner';

/** Protects routes requiring authentication. Handles silent refresh if token is missing. */
export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { meQuery } = useAuth();
  const location = useLocation();

  if (meQuery.isPending && !isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background-primary">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated && !meQuery.isPending) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
