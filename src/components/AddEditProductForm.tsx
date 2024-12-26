import  { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product } from '../types/types'
import { addProduct, updateProduct, uploadImage } from '../api/route'
import toast from 'react-hot-toast'

interface AddEditProductFormProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

const AddEditProductForm: React.FC<AddEditProductFormProps> = ({ product, isOpen, onClose }) => {
  const queryClient = useQueryClient()
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
  const [previewImage, setPreviewImage] = useState<string | null>(product?.imageUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev ) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, imageUrl: 'File size should be less than 5MB' }))
        return
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, imageUrl: 'Only JPEG, PNG, SVG, and WebP files are allowed' }))
        return
      }

      setErrors((prev) => ({ ...prev, imageUrl: '' }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)

      try {
        const imageUrl = await uploadImage(file)
        setFormData((prev) => ({ ...prev, imageUrl }))
      } catch (error) {
        if (error instanceof Error) {
          setErrors((prev) => ({ ...prev, imageUrl: error.message }))
        }
      }
    }
  }

  const addProductMutation = useMutation({
    mutationFn: (newProduct: Omit<Product, 'id'>) => addProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success("Product added successfully");
      onClose()
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  const updateProductMutation = useMutation({
    mutationFn: (updatedProduct: Product) => updateProduct(updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success("Product upddated added successfully");
      onClose()
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof Product, string>> = {}

    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be greater than 0'
    if (!formData.imageUrl) newErrors.imageUrl = 'Image URL is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (product) {
      updateProductMutation.mutate({ ...product, ...formData } as Product)
    } else {
      addProductMutation.mutate(formData as Omit<Product, 'id'>)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out">
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-500">{product ? 'Edit Product' : 'Add New Product'}</h2>
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
              className="w-full px-3 py-2 text-gray-700 border bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
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
              className="w-full px-3 py-2 border  text-gray-700  bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
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
              className="w-full px-3  text-gray-700  bg-gray-50 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
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
              className="w-full px-3 py-2 border  text-gray-700  bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">
              Product Image
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              accept="image/jpeg,image/png,image/svg+xml,image/webp"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="w-full px-3 py-2  text-gray-700 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
            {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
            {previewImage && (
              <div className="mt-2">
                <img src={previewImage} alt="Preview" className="max-w-full h-auto max-h-48 rounded-lg" />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="border-green-500 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
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

