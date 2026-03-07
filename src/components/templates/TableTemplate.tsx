import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface TableTemplateProps {
  headers: ReactNode[]
  rows: ReactNode[][]
  className?: string
}

export function TableTemplate({ headers, rows, className }: TableTemplateProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
