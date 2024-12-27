/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductModal from '../ProductModal';
import { Product } from '../../types/types';



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'This is a test product',
  price: 99.99,
  stockStatus: 'In Stock',
  imageUrl: 'https://via.placeholder.com/300',
};

const renderWithQueryClient = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('ProductModal', () => {
  it('renders product details when open', () => {
    const mockOnClose = jest.fn();
    renderWithQueryClient(<ProductModal product={mockProduct} isOpen={true} onClose={mockOnClose} />);

    expect(screen.queryAllByText('Test Product')).toHaveLength(2);
    expect(screen.getByText('This is a test product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('In Stock')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://via.placeholder.com/300');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Product');
  });

  // it('does not render when closed', () => {
  //   const mockOnClose = jest.fn();
  //   renderWithQueryClient(<ProductModal product={mockProduct} isOpen={false} onClose={mockOnClose} />);

  //   expect(screen.queryAllByText('Test Product')).not.toBeInTheDocument();
  // });
  it('does not render when closed', () => {
    const mockOnClose = jest.fn();
    renderWithQueryClient(<ProductModal product={mockProduct} isOpen={false} onClose={mockOnClose} />);
  
    // Assert that no matching elements are found
    expect(screen.queryAllByText('Test Product')).toHaveLength(0);
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    renderWithQueryClient(<ProductModal product={mockProduct} isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('switches to edit mode when Edit Product button is clicked', () => {
    const mockOnClose = jest.fn();
    renderWithQueryClient(<ProductModal product={mockProduct} isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('Edit Product'));
    expect(screen.getByText('Edit Product')).toBeInTheDocument();
  });
});

