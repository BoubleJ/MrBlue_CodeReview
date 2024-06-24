import React from 'react'

import { ArrowDownIcon } from '@/lib/icons'

export default function SortButton() {
  return (
    <button className="flex items-center gap-1">
      추천순
      <ArrowDownIcon />
    </button>
  )
}
