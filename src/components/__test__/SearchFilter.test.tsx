/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductProvider } from '../../context/ProductContext';
import SearchFilter from '../SearchFilter';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithQueryClientContext = (component: React.ReactNode) => {

  return render(
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        {component}
      </ProductProvider>
    </QueryClientProvider>
  );
};

describe('SearchFilter', () => {
  it('renders search input and stock filter dropdown', () => {
    renderWithQueryClientContext(<SearchFilter />);

    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('updates search term when input changes', () => {
    renderWithQueryClientContext(<SearchFilter />);

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(searchInput).toHaveValue('test search');
  });

  it('updates stock filter when dropdown changes', () => {
    renderWithQueryClientContext(<SearchFilter />);

    const stockFilter = screen.getByRole('combobox');
    fireEvent.change(stockFilter, { target: { value: 'In Stock' } });
    expect(stockFilter).toHaveValue('In Stock');
  });
});

