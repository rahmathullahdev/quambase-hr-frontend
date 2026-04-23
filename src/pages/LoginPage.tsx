import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";
import { LoginForm } from "@/features/auth/components/LoginForm";
import "./LoginPage.css";

const loginHero = "/login.png";

/**
 * Premium Split-Screen Login Page
 * Left: Visual Hero Section with Brand Identity
 * Right: Secure Access Portal
 */
export const LoginPage = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  if (isAuthenticated) {
    return (
      <Navigate to={user?.role === "admin" ? "/admin" : "/dashboard"} replace />
    );
  }

  return (
    <div className="min-h-screen flex bg-white text-slate-900">
      {/* ── Left Hero Section (Visual Impact) ── */}
      <div className="hidden lg:flex flex-[0.7] relative bg-slate-50 overflow-hidden border-r border-slate-200">
        {/* Background Image with Overlay */}
        <div
          className="login-hero-bg absolute inset-0"
          style={{
            backgroundImage: `url(${loginHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.9) contrast(1.1)",
          }}
        />
      </div>

      {/* ── Right Access Panel (Clean, Focused, Modern) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 relative bg-white login-panel-bg">
        <div className="w-full max-w-[420px] animate-fade-in animate-slide-up">
          {/* Mobile Branding */}
          <div className="lg:hidden text-center mb-10">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-lg shadow-indigo-600/20">
              Q
            </div>
            <h1 className="text-2xl font-black text-slate-900">
              QuamBase<span className="text-indigo-600">HR</span>
            </h1>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 -tracking-[0.03em] mb-2">
              Welcome Back
            </h2>
            <p className="text-base font-medium text-slate-500">
              Please enter your credentials to access the portal
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-3xl relative">
            <LoginForm />
          </div>

          {/* Additional Options */}
          <div className="mt-8 flex justify-between items-center text-sm font-semibold">
            <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-indigo-600" />
              Remember me
            </label>
            <button className="text-indigo-600 bg-transparent border-none cursor-pointer font-bold hover:text-indigo-700 transition-colors">
              Forgot password?
            </button>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} QuamBaseHR Solutions. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
