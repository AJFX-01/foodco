import React from 'react'
import { useProductContext } from '../context/ProductContext'

const SearchFilter: React.FC = () => {
  const { searchTerm, setSearchTerm, stockFilter, setStockFilter } = useProductContext()

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={stockFilter}
        onChange={(e) => setStockFilter(e.target.value)}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Products</option>
        <option value="In Stock">In Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>
    </div>
  )
}

export default SearchFilter

