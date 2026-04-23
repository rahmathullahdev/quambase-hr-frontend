import { useMemo } from 'react';

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  xs: { size: '24px', font: '10px' },
  sm: { size: '32px', font: '12px' },
  md: { size: '40px', font: '14px' },
  lg: { size: '56px', font: '18px' },
  xl: { size: '80px', font: '24px' },
};

/** High-fidelity Avatar with initial generation and vibrant gradient backgrounds */
export const Avatar = ({ name, size = 'md', className }: AvatarProps) => {
  const initials = useMemo(() => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }, [name]);

  const bgColor = useMemo(() => {
    const colors = [
      'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      'linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)',
      'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
      'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
      'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }, [name]);

  const { size: dimensions, font } = sizeMap[size];

  return (
    <div
      className={className}
      style={{
        width: dimensions,
        height: dimensions,
        borderRadius: '50%',
        background: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontWeight: 700,
        fontSize: font,
        userSelect: 'none',
        flexShrink: 0,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        border: '2px solid #ffffff'
      }}
    >
      {initials}
    </div>
  );
};
