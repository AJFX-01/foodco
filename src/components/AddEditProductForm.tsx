import React, { useState } from 'react'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product } from '../types/product'

interface AddEditProductFormProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

const AddEditProductForm: React.FC<AddEditProductFormProps> = ({ product, isOpen, onClose }) => {
  // const queryClient = useQueryClient()
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      description: '',
      price: 0,
      stockStatus: 'In Stock',
      imageUrl: '',
    }
  )
  const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev ) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  // const addProductMutation = useMutation(
  //   // (newProduct: Omit<Product, 'id'>) => fetch('/api/products', {
  //   //   method: 'POST',
  //   //   headers: { 'Content-Type': 'application/json' },
  //   //   body: JSON.stringify(newProduct),
  //   // }).then(res => res.json()),
  //   // {
  //   //   onSuccess: () => {
  //   //     queryClient.invalidateQueries(['products'])
  //   //     onClose()
  //   //   },
  //   // }
  // )

  // const updateProductMutation = useMutation(
  //   (updatedProduct: Product) => fetch(`/api/products/${updatedProduct.id}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(updatedProduct),
  //   }).then(res => res.json()),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(['products'])
  //       onClose()
  //     },
  //   }
  // )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // const newErrors: Partial<Record<keyof Product, string>> = {}

    // if (!formData.name) newErrors.name = 'Name is required'
    // if (!formData.description) newErrors.description = 'Description is required'
    // if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be greater than 0'
    // if (!formData.imageUrl) newErrors.imageUrl = 'Image URL is required'

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors)
    //   return
    // }

    // if (product) {
    //   updateProductMutation.mutate({ ...product, ...formData } as Product)
    // } else {
    //   addProductMutation.mutate(formData as Omit<Product, 'id'>)
    // }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out">
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-2xl font-bold mb-4">{product ? 'Edit Product' : 'Add New Product'}</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              min="0"
              step="0.01"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="stockStatus" className="block text-gray-700 font-bold mb-2">
              Stock Status
            </label>
            <select
              id="stockStatus"
              name="stockStatus"
              value={formData.stockStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
            {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEditProductForm

