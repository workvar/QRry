'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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
      <div className="flex items-center gap-4">
        {/* Pie chart on the left */}
        <div className="w-24 h-24 flex-shrink-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={40}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Usage amount text in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg font-normal">
              {used} / {limit}
            </p>
          </div>
        </div>
        {/* Title and remaining text on the right */}
        <div className="flex-1">
          <p className={`text-sm font-medium mb-1 ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            {title}
          </p>
          <p className={`text-xs ${
            isDark ? 'text-white/60' : 'text-black/60'
          }`}>
            {remaining} {title.toLowerCase().includes('qr') ? 'QR code' : 'suggestion'}{remaining !== 1 ? 's' : ''} remaining
          </p>
        </div>
      </div>
    </div>
  );
}
