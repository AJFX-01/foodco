export interface Product {
  id: string
  name: string
  description: string
  price: number
  stockStatus: 'In Stock' | 'Out of Stock'
  imageUrl: string
}