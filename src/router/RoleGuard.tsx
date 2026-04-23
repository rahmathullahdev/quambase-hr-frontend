import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/authStore';
import type { Role } from '@/types';

interface RoleGuardProps {
  allowedRoles: Role[];
}

/** Protects routes requiring specific roles (e.g., admin). Redirects to dashboard if unauthorized. */
export const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const user = useAuthStore((s) => s.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
