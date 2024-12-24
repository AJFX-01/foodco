import { render, screen, fireEvent } from '@testing-library/react';
import ProductModal from '../ProductModal';
import { Product } from '../../types/types';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'This is a test product',
  price: 99.99,
  stockStatus: 'In Stock',
  imageUrl: 'https://via.placeholder.com/300',
};

describe('ProductModal', () => {
  it('renders product details when open', () => {
    const mockOnClose = jest.fn();
    render(<ProductModal product={mockProduct} isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('In Stock')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://via.placeholder.com/300');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Product');
  });

  it('does not render when closed', () => {
    const mockOnClose = jest.fn();
    render(<ProductModal product={mockProduct} isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<ProductModal product={mockProduct} isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('switches to edit mode when Edit Product button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<ProductModal product={mockProduct} isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('Edit Product'));
    expect(screen.getByText('Edit Product')).toBeInTheDocument();
  });
});

