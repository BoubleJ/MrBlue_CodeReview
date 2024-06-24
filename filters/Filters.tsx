'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import FilterButtons from '@/components/common/filters/FilterButtons'

import AppliedFilters from './AppliedFilters'
import FilterBottomSheet from './FilterBottomSheet'
import FilterButton from './FilterButton'
import SortButton from './SortButton'

export interface FilterType {
  카테고리: object
  브랜드: object
  가격: object
}
export interface FilterDataType {
  categoryCounts: object
  brandCounts: object
  promotionCounts: object
  priceRange: string[]
}

export interface AppliedFilterType {
  [key: string]: string[]
}

export const filterName = {
  categoryCounts: '카테고리',
  brandCounts: '브랜드',
  priceRange: '가격',
  promotionCounts: '프로모션',
} as const

export default function Filters({
  totalEliments,
  stickyLocation,
  filterData,
}: {
  totalEliments: number
  stickyLocation: string
  filterData: FilterDataType
}) {
  const searchParams = useSearchParams()

  const appliedFilters: AppliedFilterType = {
    categoryCounts: searchParams.get('categoryCounts')?.split(',') ?? [],
    brandCounts: searchParams.get('brandCounts')?.split(',') ?? [],
    promotionCounts: searchParams.get('promotionCounts')?.split(',') ?? [],
    priceRange: searchParams.get('priceRange')?.split(',') ?? [],
  }

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [clickedFilter, setClickedFilter] = useState<keyof FilterDataType>('categoryCounts')

  const openFilterBottomSheet = (clickedFilter: keyof FilterDataType) => {
    setClickedFilter(clickedFilter)
    setIsBottomSheetOpen(true)
  }

  return (
    <>
      <div
        className={`sticky bg-white ${stickyLocation} z-10 flex justify-between px-4 py-2 text-body-xs text-gray-600`}
      >
        <div>총 {totalEliments}개</div>
        <div className="flex gap-3">
          <SortButton />
          <FilterButton onClick={() => openFilterBottomSheet('categoryCounts')} />
        </div>
      </div>

      {isBottomSheetOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-black opacity-40" onClick={() => setIsBottomSheetOpen(false)}></div>
          <FilterBottomSheet
            filters={filterData}
            appliedFilters={appliedFilters}
            clickedFilter={clickedFilter}
            onClose={() => setIsBottomSheetOpen(false)}
          />
        </>
      )}
      <FilterButtons filters={filterData} openFilterBottomSheet={openFilterBottomSheet} />
      <AppliedFilters prevAppliedFilters={appliedFilters} />
    </>
  )
}
