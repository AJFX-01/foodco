
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProductProvider } from './context/ProductContext'
import ProductList from '../src/components/ProductList'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <main className="min-h-screen w-[100%] bg-gray-50">
          <ProductList />
        </main>
      </ProductProvider>
    </QueryClientProvider>
  )
}

export default App
