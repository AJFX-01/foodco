import React, { useState } from 'react'
import { Product } from '../types/types'
import AddEditProductForm from './AddEditProductForm'

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out">
        {isEditing ? (
          <AddEditProductForm
            product={product}
            isOpen={isEditing}
            onClose={() => setIsEditing(false)}
          />
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-6 relative h-64">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold mb-2">${product.price.toFixed(2)}</p>
            <p className={`mb-4 ${
              product.stockStatus === 'In Stock' ? 'text-blue-500' : 'text-red-500'
            }`}>
              {product.stockStatus}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="justify-end  bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Edit Product
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductModal

