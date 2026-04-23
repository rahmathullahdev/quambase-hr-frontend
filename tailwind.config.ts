import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // ── White theme backgrounds ──
        surface: {
          DEFAULT: '#ffffff',
          muted: '#F8FAFC',
          subtle: '#F1F5F9',
          border: '#E2E8F0',
          hover: '#F1F5F9',
        },
        // ── Text ──
        ink: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          faint: '#94A3B8',
          inverse: '#ffffff',
        },
        // ── Brand accent ──
        brand: {
          DEFAULT: '#4F46E5',
          light: '#6366F1',
          muted: '#EEF2FF',
          border: '#C7D2FE',
        },
        // ── Status ──
        status: {
          'on-time-bg': '#F0FDF4',
          'on-time-text': '#16A34A',
          'on-time-border': '#BBF7D0',
          'late-bg': '#FFF7ED',
          'late-text': '#EA580C',
          'late-border': '#FED7AA',
          'half-day-bg': '#FFF7ED',
          'half-day-text': '#F97316',
          'half-day-border': '#FED7AA',
          'permission-bg': '#EEF2FF',
          'permission-text': '#4F46E5',
          'permission-border': '#C7D2FE',
          'absent-bg': '#FEF2F2',
          'absent-text': '#DC2626',
          'absent-border': '#FECACA',
          'pending-bg': '#FFFBEB',
          'pending-text': '#D97706',
          'pending-border': '#FDE68A',
        },
        // ── Keep backward-compat aliases ──
        background: {
          primary: '#ffffff',
          secondary: '#F8FAFC',
          tertiary: '#ffffff',
          border: '#E2E8F0',
          hover: '#F1F5F9',
        },
        accent: {
          primary: '#4F46E5',
          secondary: '#6366F1',
          muted: '#EEF2FF',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          tertiary: '#94A3B8',
          inverse: '#ffffff',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)',
        'card-hover': '0 4px 16px rgba(79,70,229,0.10), 0 1px 4px rgba(15,23,42,0.05)',
        modal: '0 20px 60px -10px rgba(15,23,42,0.15), 0 4px 16px -4px rgba(15,23,42,0.08)',
        button: '0 1px 2px rgba(79,70,229,0.20)',
        sidebar: '1px 0 0 #E2E8F0',
        topbar: '0 1px 0 #E2E8F0',
      },
      animation: {
        'fade-in': 'fadeIn 250ms ease-out both',
        'slide-up': 'slideUp 300ms cubic-bezier(0.16,1,0.3,1) both',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.16,1,0.3,1) both',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseDot: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
