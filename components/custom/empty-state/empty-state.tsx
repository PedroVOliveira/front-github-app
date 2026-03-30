import React from 'react'
import { Search } from 'lucide-react'
import { type EmptyStateProps } from './type'

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="size-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-6">
        <Search className="size-7 text-zinc-400" />
      </div>
      <h2 className="text-lg font-semibold text-zinc-900 mb-2">{title}</h2>
      <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">{description}</p>
    </div>
  )
}

export default EmptyState
