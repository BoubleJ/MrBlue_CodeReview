import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import { AppliedFilterType } from './Filters'

export default function AppliedFilters({ prevAppliedFilters }: { prevAppliedFilters: AppliedFilterType }) {
  const router = useRouter()
  const pathname = usePathname()

  const removeFilterOption = (filterName: keyof AppliedFilterType) => (option: string) => {
    const updatedOptions = prevAppliedFilters[filterName].filter((item) => item !== option)
    applyURL({ ...prevAppliedFilters, [filterName]: updatedOptions })
  }

  const applyURL = (filters: AppliedFilterType) => {
    const newSearchParams = new URLSearchParams()

    for (const [name, options] of Object.entries(filters)) {
      if (options.length > 0) {
        newSearchParams.append(name, options.join(','))
      }
    }

    const updatedPathname = `${pathname}?${newSearchParams.toString()}`
    router.replace(updatedPathname)
  }

  return (
    <div className="no-scrollbar flex overflow-x-scroll whitespace-nowrap px-4 py-1 text-body-sm">
      {Object.keys(prevAppliedFilters).map((filterName, index) => {
        return (
          <FilterBadge
            key={index}
            filterName={filterName}
            filterOptions={prevAppliedFilters[filterName as keyof AppliedFilterType]}
            onRemoveClick={removeFilterOption(filterName)}
          />
        )
      })}
    </div>
  )
}

function FilterBadge({
  filterName,
  filterOptions,
  onRemoveClick,
}: {
  filterName: string
  filterOptions: string[]
  onRemoveClick: (option: string) => void
}) {
  return (
    <div className="flex" key={filterName}>
      {filterOptions &&
        filterOptions.map((option: string) => (
          <button key={`${filterName}-${option}`} onClick={() => onRemoveClick(option)} className="flex gap-1 pr-4">
            <span className="text-brand-primary-500">{option}</span>
            <span className="text-grayscale-300">x</span>
          </button>
        ))}
    </div>
  )
}
