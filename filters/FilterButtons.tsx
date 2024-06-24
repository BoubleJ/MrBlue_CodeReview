import { usePathname } from 'next/navigation'
import React from 'react'

import { ArrowDownIcon } from '@/lib/icons'

import { FilterDataType, filterName } from './Filters'

export default function FilterButtons({
  filters,
  openFilterBottomSheet,
}: {
  filters: FilterDataType
  openFilterBottomSheet: (clickedFilter: keyof FilterDataType) => void
}) {
  const pathname = usePathname()
  const isCategoryPage = pathname.includes('categories')

  // const filterName = {
  //   categoryCounts: '카테고리',
  //   brandCounts: '브랜드',
  //   priceRange: '가격',
  //   promotionCounts: '프로모션',
  // } as const

  console.log(filters)
  return (
    <div className="flex gap-4 px-3 py-2">
      {(Object.keys(filters) as Array<keyof FilterDataType>).map((filterKey) => (
        <div key={filterKey}>
          {isCategoryPage && filterKey === 'categoryCounts' ? null : (
            <button
              className="font-md flex items-center gap-1 rounded-full border border-grayscale-200 bg-white px-3 py-1 text-xs text-gray-600"
              onClick={() => openFilterBottomSheet(filterKey)}
            >
              {filterName[filterKey]}
              <ArrowDownIcon />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
