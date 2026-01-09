'use client';

import { useState } from 'react';
import { QRCode } from '@/lib/supabase/types';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface DeletedQRTableProps {
  qrCodes: QRCode[];
  isDark: boolean;
}

export function DeletedQRTable({ qrCodes, isDark }: DeletedQRTableProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (qrCodes.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between px-6 py-4 rounded-[2rem] border transition-all ${
          isDark
            ? 'border-white/10 bg-white/5 hover:bg-white/10'
            : 'border-black/5 bg-white hover:bg-black/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`text-sm font-bold ${
            isDark ? 'text-white/60' : 'text-black/60'
          }`}>
            Deleted QR Codes
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
            isDark
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {qrCodes.length}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUpIcon className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-black/60'}`} />
        ) : (
          <ChevronDownIcon className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-black/60'}`} />
        )}
      </button>

      {isExpanded && (
        <div className={`mt-4 rounded-[2rem] border overflow-hidden ${
          isDark
            ? 'border-white/10 bg-white/5'
            : 'border-black/5 bg-white'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-white/10' : 'border-black/5'}`}>
                  <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    Name
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    Type
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    URL
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    Created
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    Deleted
                  </th>
                </tr>
              </thead>
              <tbody>
                {qrCodes.map((qr, index) => {
                  const isDynamic = qr.settings?.isDynamic || false;

                  return (
                    <tr
                      key={qr.id}
                      className={`group border-b transition-colors ${
                        isDark
                          ? 'border-white/5 bg-white/5 opacity-50'
                          : 'border-black/5 bg-black/5 opacity-50'
                      } ${index === qrCodes.length - 1 ? 'border-b-0' : ''}`}
                    >
                      <td className={`px-6 py-4 font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                        <div className="flex items-center gap-2">
                          <span className="line-through opacity-60">{qr.name}</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                            isDark
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-red-100 text-red-700 border border-red-300'
                          }`}>
                            Deleted
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {isDynamic ? (
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            isDark
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-green-100 text-green-700 border border-green-300'
                          }`}>
                            Dynamic
                          </span>
                        ) : (
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            isDark
                              ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                              : 'bg-gray-100 text-gray-700 border border-gray-300'
                          }`}>
                            Static
                          </span>
                        )}
                      </td>
                      <td className={`px-6 py-4 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                        <div className="max-w-md truncate line-through opacity-60" title={qr.url}>
                          {qr.url}
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                        {new Date(qr.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                        {qr.deleted_at ? new Date(qr.deleted_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
