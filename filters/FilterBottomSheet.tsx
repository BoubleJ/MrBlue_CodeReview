import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import FilterBottomSheetHeader from './FilterBottomSheetHeader'
import FilterBottomSheetOptions from './FilterBottomSheetOptions'
import { AppliedFilterType, FilterDataType } from './Filters'

interface FilterBottomSheetProps {
  filters: FilterDataType
  appliedFilters: AppliedFilterType
  clickedFilter: keyof FilterDataType
  onClose: () => void
}

export default function FilterBottomSheet({ filters, appliedFilters, clickedFilter, onClose }: FilterBottomSheetProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedFilter, setSelectedFilter] = useState<keyof FilterDataType>(clickedFilter)
  const [selectedFilters, setSelectedFilters] = useState<AppliedFilterType>(appliedFilters)

  const handleFilterChange = (filterKey: keyof FilterDataType) => {
    setSelectedFilter(filterKey)
  }

  const handleCheckboxChange = (option: string) => {
    console.log(`${option} checked!`)
    const updatedFilters = getUpdatedFilters(selectedFilters, selectedFilter, option)
    setSelectedFilters(updatedFilters)
    console.log('updateFilters!!!!!!!', updatedFilters)
  }

  const getUpdatedFilters = (
    selectedFilters: AppliedFilterType,
    filterName: keyof FilterDataType,
    option: string,
  ): AppliedFilterType => {
    const filterOptions = selectedFilters[filterName]
    if (filterName === 'priceRange') {
      // '가격'인 경우에는 라디오 버튼처럼 작동
      return { ...selectedFilters, [filterName]: [option] }
    }

    if (filterOptions) {
      const updatedOptions = filterOptions.includes(option)
        ? filterOptions.filter((item) => item !== option)
        : [...filterOptions, option]

      return { ...selectedFilters, [filterName]: updatedOptions }
    }

    return selectedFilters
  }

  const handleApplyFilter = () => {
    onClose()

    const queryParams = Object.entries(selectedFilters)
      .filter(([filter, selectedOptions]) => selectedOptions && selectedOptions.length > 0)
      .map(([filterKey, selectedOptions]) => `${filterKey}=${selectedOptions.join(',')}`)
      .join('&')
    //queryParams is like {카테고리: '소설,태블릿,스마트폰', 브랜드: '구글,애플', 가격: '0~10000'}
    console.log(queryParams, '쿼리 파라아아아아아ㅏ암ㅈ브')

    router.push(`${pathname}?${queryParams}`)
  }

  return (
    <div>
      <div className="no-scrollbar fixed bottom-0 z-40 h-96 w-96 overflow-scroll rounded-t-lg bg-white pb-4">
        <div className="relative">
          <FilterBottomSheetHeader
            filters={filters}
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
          />
          <FilterBottomSheetOptions
            selectedFilter={filters[selectedFilter]}
            selectedCategories={selectedFilters[selectedFilter] || []}
            handleCheckboxChange={handleCheckboxChange}
          />

          <div className="fixed bottom-0 flex w-96 justify-center gap-8 bg-white p-4">
            <button onClick={() => handleApplyFilter()} className="h-12 text-sm font-medium">
              초기화
            </button>
            <Button onClick={() => handleApplyFilter()} variant={'primary'} className="h-12 w-3/4">
              적용하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
