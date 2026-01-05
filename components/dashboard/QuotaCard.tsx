'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface QuotaCardProps {
  title: string;
  used: number;
  limit: number;
  remaining: number;
  usedColor: string;
  remainingColor: string;
  isDark: boolean;
  isWarning?: boolean;
}

export function QuotaCard({
  title,
  used,
  limit,
  remaining,
  usedColor,
  remainingColor,
  isDark,
  isWarning = false,
}: QuotaCardProps) {
  const chartData = [
    { name: 'Used', value: used, color: usedColor },
    { name: 'Remaining', value: remaining, color: remainingColor },
  ];

  return (
    <div className={`p-4 rounded-2xl border transition-all ${
      isWarning
        ? isDark
          ? 'border-orange-500/30 bg-orange-500/10'
          : 'border-orange-500/30 bg-orange-50'
        : isDark
          ? 'border-white/10 bg-white/5'
          : 'border-black/5 bg-white'
    }`}>
      <div className="mb-3">
        <p className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
          isDark ? 'text-white/40' : 'text-black/40'
        }`}>
          {title}
        </p>
        <p className="text-2xl font-bold mb-0.5">
          {used} / {limit}
        </p>
        <p className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>
          {remaining} {title.toLowerCase().includes('qr') ? 'QR code' : 'suggestion'}{remaining !== 1 ? 's' : ''} remaining
        </p>
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={28}
              outerRadius={42}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                borderRadius: '12px',
                color: isDark ? '#ffffff' : '#000000',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
