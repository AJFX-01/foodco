/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddEditProductForm from '../AddEditProductForm';
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

describe('AddEditProductForm', () => {
  it('renders add form when no product is provided', () => {
    const mockOnClose = jest.fn();
    renderWithQueryClient(<AddEditProductForm product={null} isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Add New Product')).toBeInTheDocument();
  });

  it('renders edit form when product is provided', () => {
    const mockOnClose = jest.fn();
    renderWithQueryClient(<AddEditProductForm product={mockProduct} isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Edit Product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('This is a test product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('99.99')).toBeInTheDocument();
  });

  it('validates form fields', async () => {
    const mockOnClose = jest.fn();
    renderWithQueryClient(<AddEditProductForm product={null} isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('Add Product'));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Description is required')).toBeInTheDocument();
      expect(screen.getByText('Price must be greater than 0')).toBeInTheDocument();
      expect(screen.getByText('Image URL is required')).toBeInTheDocument();
    });
  });

  it('calls onClose when Cancel button is clicked', () => {
    const mockOnClose = jest.fn();
    renderWithQueryClient(<AddEditProductForm product={null} isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

