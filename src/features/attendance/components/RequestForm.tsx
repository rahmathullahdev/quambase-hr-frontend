import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAttendance } from '../hooks/useAttendance';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Send, Zap, Clock, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

const requestSchema = z.object({
  type: z.enum(['permission', 'half_day', 'late'], {
    required_error: 'Please select a request type',
  }),
  reason: z.string()
    .min(10, 'Reason must be at least 10 characters')
    .max(1000, 'Reason cannot exceed 1000 characters'),
});

type RequestFormData = z.infer<typeof requestSchema>;

interface RequestFormProps {
  date: string;
  onSuccess?: () => void;
}

const TYPE_CARDS = [
  { value: 'permission', label: 'Permission', sub: 'Until 10:30 AM', icon: <Zap size={18} />, color: '#6366F1', bg: '#EEF2FF' },
  { value: 'late', label: 'Late Arrival', sub: 'Until 12:00 PM', icon: <Clock size={18} />, color: '#F59E0B', bg: '#FFFBEB' },
  { value: 'half_day', label: 'Half Day', sub: 'After 12:00 PM', icon: <Calendar size={18} />, color: '#10B981', bg: '#F0FDF4' },
] as const;

/** Premium RequestForm — Intelligence Tier UI v2 (Interactive Desk) */
export const RequestForm = ({ date, onSuccess }: RequestFormProps) => {
  const { submitRequest } = useAttendance();
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      type: undefined,
      reason: ''
    }
  });

  const selectedType = useWatch({ control, name: 'type' });

  const onSubmit = (data: RequestFormData) => {
    submitRequest.mutate(
      { date, type: data.type, reason: data.reason },
      {
        onSuccess: () => {
          reset();
          onSuccess?.();
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
      <div>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748B', fontWeight: 600, lineHeight: 1.5 }}>
           Preparing authorization for <span style={{ color: '#4F46E5', fontWeight: 800 }}>{date}</span>. 
           Select category and provide details.
        </p>
      </div>

      {/* Interactive Type Selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
         <label style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', marginBottom: '2px', display: 'block' }}>Select Category</label>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {TYPE_CARDS.map((card) => (
               <div
                  key={card.value}
                  onClick={() => setValue('type', card.value)}
                  style={{
                     padding: '8px',
                     borderRadius: '12px',
                     border: `2px solid ${selectedType === card.value ? card.color : '#F1F5F9'}`,
                     backgroundColor: selectedType === card.value ? card.bg : '#ffffff',
                     cursor: 'pointer',
                     transition: 'all 0.2s',
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     textAlign: 'center',
                     gap: '8px'
                  }}
               >
                  <div style={{ height: '28px', width: '28px', borderRadius: '8px', backgroundColor: '#ffffff', color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                     {card.icon}
                  </div>
                  <div>
                     <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{card.label}</p>
                     <p style={{ margin: 0, fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>{card.sub.split(' ')[1] + ' ' + card.sub.split(' ')[2]}</p>
                  </div>
               </div>
            ))}
         </div>
         {errors.type && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#EF4444', fontWeight: 600 }}>{errors.type.message}</p>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
         <Textarea
            label="Verification Details"
            placeholder="Explain the necessity..."
            {...register('reason')}
            error={errors.reason?.message}
            style={{ minHeight: '60px', borderRadius: '12px', fontSize: '13px' }}
         />
      </div>

      <div style={{ 
        backgroundColor: '#F8FAFC', padding: '10px', borderRadius: '16px', border: '1px solid #E2E8F0',
        display: 'flex', alignItems: 'flex-start', gap: '10px'
      }}>
         <ShieldAlert size={16} color="#64748B" style={{ marginTop: '1px' }} />
         <p style={{ margin: 0, fontSize: '11px', color: '#64748B', lineHeight: 1.4 }}>
            Submitting creates an official log. Your manager will be notified.
         </p>
      </div>

      <Button
        type="submit"
        style={{ 
          width: '100%', height: '44px', borderRadius: '12px', fontSize: '14px', fontWeight: 800,
          background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)', boxShadow: '0 4px 12px rgba(79,70,229,0.15)'
        }}
        isLoading={submitRequest.isPending}
        disabled={submitRequest.isPending}
      >
        <Send size={18} />
        Transmit Request
      </Button>
    </form>
  );
};
