import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api/route'
import { ProductContext } from './useContextHook'

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [stockFilter, setStockFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8 

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

