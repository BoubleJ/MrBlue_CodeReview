export type CategoryList = Category[]

export type SubCategory = {
  name: string
}

export type Category = {
  id: number
  name: string
  subCategories: SubCategory[]
}
