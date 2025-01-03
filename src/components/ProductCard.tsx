import { Product } from '../types/types'

interface ProductCardProps {
  product: Product
  onViewDetails: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xm font-semibold mb-2 text-gray-500 text-ellipsis line-clamp-1">{product.name}</h2>
        <p className="text-gray-600 mb-2">${product.price}</p>
        <p className={`mb-4 ${
          product.stockStatus === 'In Stock' ? 'text-purple-500' : 'text-red-500'
        }`}>
          {product.stockStatus}
        </p>
        <button
          onClick={onViewDetails}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default ProductCard

