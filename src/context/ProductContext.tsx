import React, { createContext, useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Product } from '../types/product'
import { fetchProducts } from '../api/route'

interface ProductContextType {
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

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [stockFilter, setStockFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8 // Number of products per page

  // const fetchProducts = async (): Promise<Product[]> => {
  //   const response = await fetch(`/api/products?page=${currentPage}&pageSize=${pageSize}&search=${searchTerm}&stockFilter=${stockFilter}`)
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok')
  //   }
  //   return response.json()
  // }

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', currentPage, searchTerm, stockFilter],
    queryFn: () => fetchProducts(currentPage, pageSize, searchTerm, stockFilter),
  });
  

  const products = data?.products || []
  const totalPages = data?.totalPages || 1

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        stockFilter,
        setStockFilter,
        currentPage,
        setCurrentPage,
        totalPages,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

