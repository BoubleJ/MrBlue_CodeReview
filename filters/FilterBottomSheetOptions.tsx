import React from 'react'

export default function FilterBottomSheetOptions({
  selectedFilter,
  selectedCategories,
  handleCheckboxChange,
}: {
  selectedFilter: object | string[]
  selectedCategories: string[]
  handleCheckboxChange: (option: string) => void
}) {
  return (
    <div className="pb-4 px-6">
      {Array.isArray(selectedFilter)
        ? selectedFilter.map((option, index) => (
            <div key={index} className="py-2">
              <input
                type="radio"
                id={option}
                name="category"
                checked={selectedCategories.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              <label>
                <span className="text-sm font-medium px-2">{option}</span>
              </label>
            </div>
          ))
        : Object.entries(selectedFilter).map(([option, count]) => (
            <div key={option} className="py-2">
              <input
                type="checkbox"
                id={option}
                checked={selectedCategories.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              <label>
                <span className="text-sm font-medium px-2">{option}</span>
                <span className="text-xs font-medium text-grayscale-300"> {count}</span>
              </label>
            </div>
          ))}
    </div>
  )
}
