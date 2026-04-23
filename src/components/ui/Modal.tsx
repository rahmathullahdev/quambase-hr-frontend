import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/** Premium modal — white theme */
export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="animate-fade-in"
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(15,23,42,0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
        <div
          onClick={e => e.stopPropagation()}
          className="animate-slide-up"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            boxShadow: '0 20px 60px -10px rgba(15,23,42,0.20)',
            width: '100%',
            maxWidth: '420px',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
          }}>
            <h3 style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0,
            }}>{title}</h3>
            <button
              onClick={onClose}
              style={{
                padding: '6px', borderRadius: '8px', border: 'none',
                background: 'transparent', color: '#94A3B8', cursor: 'pointer',
                display: 'flex', alignItems: 'center', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#475569'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94A3B8'; }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '20px', color: '#0F172A' }}>
            {children}
          </div>
        </div>
    </div>,
    document.body
  );
};
