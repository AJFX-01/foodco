import { Product } from '../types/types'

const API_URL = 'http://localhost:3333/products';


export const fetchProducts = async (
  page: number,
  pageSize: number,
  search: string,
  stockFilter: string
) => {
  const response = await fetch(API_URL);
  const products: Product[] = await response.json();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesStock = stockFilter === 'all' || product.stockStatus === stockFilter;
    return matchesSearch && matchesStock;
  });

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  return {
    products: paginatedProducts,
    currentPage: page,
    totalPages: totalPages,
    totalProducts: totalProducts,
  };
};

export const addProduct = async (newProduct: Omit<Product, 'id'>) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  });
  return response.json();
};

export const updateProduct = async (updatedProduct: Product) => {
  const response = await fetch(`${API_URL}/${updatedProduct.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedProduct),
  });

  if (!response.ok) {
    throw new Error('Product not found');
  }

  return response.json();
};


export const uploadImage = async (file: File): Promise<string> => {
  // Simulate API delay and file upload
  await new Promise(resolve => setTimeout(resolve, 1000))

  // For this mock, we'll create a default url for all our images, since we do not have a server to store the images
  // i do not want to use base64, so we just use a default image 
  // Create a fake URL for the uploaded image
  // This URL will be used as the product's image URL in our app
  // You'd want to replace this with a real implementation in a real-world application.
  const fakeUrl = URL.createObjectURL(file)

  // Return the fake URL
  return fakeUrl
}
