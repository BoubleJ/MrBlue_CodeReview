import React from 'react'

import { OptionsIcon } from '@/lib/icons'

export default function FilterButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="flex items-center gap-1" onClick={onClick}>
      필터
      <OptionsIcon />
    </button>
  )
}
