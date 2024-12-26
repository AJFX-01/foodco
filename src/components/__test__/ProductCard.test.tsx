/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { Product } from '../../types/types';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'This is a test product',
  price: 99.99,
  stockStatus: 'In Stock',
  imageUrl: 'https://via.placeholder.com/300',
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    const mockOnViewDetails = jest.fn();
    render(<ProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('In Stock')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://via.placeholder.com/300');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Product');
  });

  it('calls onViewDetails when "View Details" button is clicked', () => {
    const mockOnViewDetails = jest.fn();
    render(<ProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);

    fireEvent.click(screen.getByText('View Details'));
    expect(mockOnViewDetails).toHaveBeenCalledTimes(1);
  });
});

