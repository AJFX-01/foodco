import React, { useState } from 'react'
import { useProductContext } from '../context/useContextHook'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'
import SearchFilter from './SearchFilter'
import AddEditProductForm from './AddEditProductForm'
import Pagination from './Pagination'
import { Product } from '../types/types'

const ProductList: React.FC = () => {
  const { products, isLoading, error, currentPage, setCurrentPage, totalPages } = useProductContext()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)

  if (isLoading) return <div className="text-center py-8 text-green-800">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex flex-row justify-between'>
        <h1 className="text-green-500 text-3xl font-bold mb-8">FoodCo</h1>
        <h1 className="text-gray-700 text-2xl font-bold mb-8">Good Day, Ajegbomogun!</h1>
      </div>
      <SearchFilter />
      <div className='flex flex-row justify-between'>
        <h2 className="text-gray-700 text-xm font-bold">Products ({products.length})</h2>
        <button
          onClick={() => setIsAddFormOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mb-4 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add New Product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={() => {
              setSelectedProduct(product)
              setIsModalOpen(true)
            }}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <AddEditProductForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        product={null}
      />
    </div>
  )
}

export default ProductList

