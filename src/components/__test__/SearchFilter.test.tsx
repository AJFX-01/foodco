import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilter from '../SearchFilter';
import { ProductProvider } from '../../context/ProductContext';

const renderWithContext = (component: React.ReactNode) => {
  return render(
    <ProductProvider>
      {component}
    </ProductProvider>
  );
};

describe('SearchFilter', () => {
  it('renders search input and stock filter dropdown', () => {
    renderWithContext(<SearchFilter />);

    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('updates search term when input changes', () => {
    renderWithContext(<SearchFilter />);

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(searchInput).toHaveValue('test search');
  });

  it('updates stock filter when dropdown changes', () => {
    renderWithContext(<SearchFilter />);

    const stockFilter = screen.getByRole('combobox');
    fireEvent.change(stockFilter, { target: { value: 'In Stock' } });
    expect(stockFilter).toHaveValue('In Stock');
  });
});

