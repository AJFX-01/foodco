export interface ProductContextType {
  products: Product[]
  isLoading: boolean
  error: Error | null
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  stockFilter: string
  setStockFilter: React.Dispatch<React.SetStateAction<string>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
}


export interface Product {
  id: string
  name: string
  description: string
  price: number
  stockStatus: 'In Stock' | 'Out of Stock'
  imageUrl: string
}