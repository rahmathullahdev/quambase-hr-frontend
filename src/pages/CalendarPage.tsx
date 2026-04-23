import { PageHeader } from '@/components/layout/PageHeader';
import { CalendarView } from '@/features/attendance/components/CalendarView';

export const CalendarPage = () => {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader 
        title="QuamBaseHR Calendar" 
        description="View your daily check-in patterns, past records, and submit leave requests for specific dates."
      />
      <div className="animate-slide-up">
        <CalendarView />
      </div>
    </div>
  );
};

export default CalendarPage;
