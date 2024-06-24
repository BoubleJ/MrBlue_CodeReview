'use client'

import React, { useEffect, useState } from 'react'

import { fetchCategoryFilterData } from '@/api/resource/category'
import Filters, { FilterDataType } from '@/components/common/filters/Filters'

export default function CategoryFilter({
  itemLength,
  categoryNameParam,
}: {
  itemLength: number
  categoryNameParam: string
}) {
  const [filterData, setFilterData] = useState<FilterDataType>({
    categoryCounts: {},
    brandCounts: {},
    promotionCounts: {},
    priceRange: [],
  })

  useEffect(() => {
    fetchCategoryFilterData(categoryNameParam).then((data) => {
      setFilterData(data)
    })
  }, [categoryNameParam])

  return (
    <>
      <Filters totalEliments={itemLength} stickyLocation={'top-28'} filterData={filterData} />
    </>
  )
}
