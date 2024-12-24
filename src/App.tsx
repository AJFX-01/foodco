
import './App.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProductProvider } from './context/ProductContext'
import ProductList from '../src/components/ProductList'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <main className="min-h-screen bg-gray-100">
          <ProductList />
        </main>
      </ProductProvider>
    </QueryClientProvider>
  )
}

export default App
