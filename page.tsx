'use client'
import React, { useEffect, useState } from 'react'

import { fetchCategoryItems } from '@/api/resource/category'
import CategoryFilter from '@/components/feature/category/categoryItem/CategoryFilter'
import CategoryItemsList from '@/components/feature/category/categoryItem/CategoryItemsList'
import { ContentType } from '@/types/product'

export default function CategoryItemsPage({
  params,
  searchParams,
}: {
  params: { categoryName: string }
  searchParams: {
    ['brandCounts']: string | null
    ['priceRange']: string | null
    ['page']: number | null
  }
}) {
  const [productList, setProductList] = useState<ContentType>([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  const decodedcategoryName = decodeURIComponent(params.categoryName)

  const decodeCategoryName = decodedcategoryName.split('-')
  const mainCategory = decodeCategoryName[0]
  const subCategory = decodeCategoryName[1]

  const categoryNameParam = subCategory === '전체보기' ? mainCategory : subCategory
  const brandParams = searchParams?.['brandCounts']
  const priceParams = searchParams?.['priceRange']
  // --------------------------

  useEffect(() => {
    fetchCategoryItems(categoryNameParam, brandParams, priceParams, 0)
      .then(({ content, totalPages, totalElements }) => {
        console.log('콘텐트임ㅁㅁ!!!!!!!', content)
        console.log('콘텐트임ㅁㅁ!!!!!!!', totalPages)
        console.log('콘텐트임ㅁㅁ!!!!!!!', totalElements)

        // 왜 같은거 두번????????/
        setProductList(content)
        setTotalPages(totalPages)
        setTotalElements(totalElements)
        // setIsLoading(false)
      })
      .catch((error) => {
        console.error('data fetch 실패', error)
      })
  }, [categoryNameParam, brandParams, priceParams])

  // ----------------------------------------
  // const categoryItem = await fetchCategoryItems(categoryNameParam, brandParams, priceParams)
  // console.log(categoryItem.items.content.length)

  return (
    <div className="pt-28">
      <CategoryFilter itemLength={totalElements} categoryNameParam={categoryNameParam} />
      <div>
        <div>{totalPages}</div>
        <CategoryItemsList
          initialProductList={productList}
          params={{
            categoryNameParam,
            brandParams,
            priceParams,
          }}
          totalPage={totalPages}
        />
      </div>
    </div>
  )
}
