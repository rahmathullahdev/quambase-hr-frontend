import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, subDays } from 'date-fns';

/** Advanced Workforce Analytics Chart — Premium White Theme */
const generateMockData = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      date: format(date, 'MMM dd'),
      present: Math.floor(Math.random() * 20) + 35, // 35-55
      late: Math.floor(Math.random() * 8) + 2,      // 2-10
      absent: Math.floor(Math.random() * 5),        // 0-5
    });
  }
  return data;
};

export const AttendanceChart = () => {
  const data = useMemo(() => generateMockData(), []);

  return (
    <div style={{ width: '100%', height: '320px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={12} barGap={4}>
          <defs>
             <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={1}/>
                <stop offset="100%" stopColor="#059669" stopOpacity={1}/>
             </linearGradient>
             <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={1}/>
                <stop offset="100%" stopColor="#D97706" stopOpacity={1}/>
             </linearGradient>
             <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={1}/>
                <stop offset="100%" stopColor="#DC2626" stopOpacity={1}/>
             </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#94A3B8" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false}
            minTickGap={25}
          />
          <YAxis 
            stroke="#94A3B8" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
            tickCount={6}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              border: 'none',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(15,23,42,0.12)',
              fontSize: '13px',
              padding: '12px 16px',
            }}
            cursor={{ fill: '#F1F5F9' }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: '32px', fontSize: '12px', fontWeight: 700, color: '#64748B' }}
          />
          <Bar dataKey="present" name="On Time" stackId="a" fill="url(#colorPresent)" radius={[0, 0, 4, 4]} />
          <Bar dataKey="late" name="Late" stackId="a" fill="url(#colorLate)" />
          <Bar dataKey="absent" name="Absent" stackId="a" fill="url(#colorAbsent)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
