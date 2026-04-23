import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { useAdminData } from '../hooks/useAdminData';
import type { LeaveRequest } from '@/types';
import { useEffect } from 'react';

const rejectSchema = z.object({
  reason: z.string().min(5, 'Reason must be at least 5 characters').max(500),
});

const modifySchema = z.object({
  type: z.enum(['on_time', 'permission', 'half_day', 'late']),
  note: z.string().min(5, 'Note must be at least 5 characters').max(500),
});

type RejectData = z.infer<typeof rejectSchema>;
type ModifyData = z.infer<typeof modifySchema>;

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'reject' | 'modify';
  request: LeaveRequest;
}

const TYPE_OPTIONS = [
  { value: 'on_time', label: 'On Time (Override)' },
  { value: 'permission', label: 'Permission (Until 10:30 AM)' },
  { value: 'late', label: 'Late (Until 12:00 PM)' },
  { value: 'half_day', label: 'Half Day (After 12:00 PM)' },
];

export const ApprovalModal = ({ isOpen, onClose, type, request }: ApprovalModalProps) => {
  const { rejectRequest, modifyRequest } = useAdminData();

  const rejectForm = useForm<RejectData>({
    resolver: zodResolver(rejectSchema),
    defaultValues: { reason: '' },
  });

  const modifyForm = useForm<ModifyData>({
    resolver: zodResolver(modifySchema),
    defaultValues: { type: request.type, note: '' },
  });

  useEffect(() => {
    if (isOpen) {
      rejectForm.reset();
      modifyForm.reset({ type: request.type, note: '' });
    }
  }, [isOpen, request, rejectForm, modifyForm]);

  const onRejectSubmit = (data: RejectData) => {
    rejectRequest.mutate(
      { id: request._id, reason: data.reason },
      { onSuccess: onClose }
    );
  };

  const onModifySubmit = (data: ModifyData) => {
    modifyRequest.mutate(
      { id: request._id, type: data.type, note: data.note },
      { onSuccess: onClose }
    );
  };

  const isPending = rejectRequest.isPending || modifyRequest.isPending;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === 'reject' ? 'Reject Request' : 'Modify Request'}
    >
      {type === 'reject' ? (
        <form onSubmit={rejectForm.handleSubmit(onRejectSubmit)} className="space-y-4 pt-2 text-left">
          <p className="text-sm text-text-secondary mb-4">
            Please provide a reason for rejecting this request from {request.user?.name}.
          </p>
          <Textarea
            label="Rejection Reason"
            placeholder="E.g., Insufficient leave balance..."
            {...rejectForm.register('reason')}
            error={rejectForm.formState.errors.reason?.message}
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" onClick={onClose} type="button" disabled={isPending}>
              Cancel
            </Button>
            <Button variant="danger" type="submit" isLoading={isPending}>
              Reject Request
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={modifyForm.handleSubmit(onModifySubmit)} className="space-y-4 pt-2 text-left">
          <p className="text-sm text-text-secondary mb-4">
            Modify the request type and add an admin note.
          </p>
          <Select
            label="Request Type"
            options={TYPE_OPTIONS}
            {...modifyForm.register('type')}
            error={modifyForm.formState.errors.type?.message}
          />
          <Textarea
            label="Admin Note"
            placeholder="Reason for modification..."
            {...modifyForm.register('note')}
            error={modifyForm.formState.errors.note?.message}
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" onClick={onClose} type="button" disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isPending}>
              Save Changes
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
