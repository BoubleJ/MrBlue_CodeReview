import React from 'react'

import { FilterDataType, filterName } from './Filters'

export default function FilterBottomSheetHeader({
  filters,
  selectedFilter,
  handleFilterChange,
}: {
  filters: FilterDataType
  selectedFilter: keyof FilterDataType
  handleFilterChange: (filterKey: keyof FilterDataType) => void
}) {
  return (
    <div className="sticky top-0 bg-white px-6">
      <div className="pt-5 text-headline3">필터</div>
      <div className="my-3 flex gap-5 border-b border-gray-200 bg-white pt-3 text-sm font-semibold">
        {(Object.keys(filters) as Array<keyof FilterDataType>).map((key) => (
          <button
            className={`pb-2 ${
              key === selectedFilter
                ? 'border-b-2 border-brand-primary-500 text-brand-primary-500'
                : 'text-grayscale-400'
            } `}
            key={key}
            onClick={() => handleFilterChange(key as keyof FilterDataType)}
          >
            {filterName[key]}
          </button>
        ))}
      </div>
    </div>
  )
}
