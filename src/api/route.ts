import { Product } from '../types/product'

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone X',
    description: 'The latest smartphone with advanced features.',
    price: 799.99,
    stockStatus: 'In Stock',
    imageUrl: 'https://via.placeholder.com/300',
  },
  {
    id: '2',
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals.',
    price: 1299.99,
    stockStatus: 'In Stock',
    imageUrl: 'https://via.placeholder.com/300',
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    description: 'Premium sound quality with noise cancellation.',
    price: 149.99,
    stockStatus: 'Out of Stock',
    imageUrl: 'https://via.placeholder.com/300',
  },
  // Add more mock products as needed
]

export const fetchProducts = async (page: number, pageSize: number, search: string, stockFilter: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesStock = stockFilter === 'all' || product.stockStatus === stockFilter
    return matchesSearch && matchesStock
  })

  const totalProducts = filteredProducts.length
  const totalPages = Math.ceil(totalProducts / pageSize)

  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize)

  return {
    products: paginatedProducts,
    currentPage: page,
    totalPages: totalPages,
    totalProducts: totalProducts,
  }
}

export const addProduct = async (newProduct: Omit<Product, 'id'>) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const product: Product = {
    ...newProduct,
    id: (mockProducts.length + 1).toString(),
  }
  mockProducts.push(product)
  return product
}

export const updateProduct = async (updatedProduct: Product) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const index = mockProducts.findIndex((p) => p.id === updatedProduct.id)
  if (index !== -1) {
    mockProducts[index] = updatedProduct
    return updatedProduct
  }
  throw new Error('Product not found')
}

