import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination', () => {
  it('renders current page and total pages', () => {
    const mockOnPageChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('2 of 5')).toBeInTheDocument();
  });

  it('calls onPageChange with correct page number when clicking Previous', () => {
    const mockOnPageChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);

    fireEvent.click(screen.getByText('Previous'));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with correct page number when clicking Next', () => {
    const mockOnPageChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);

    fireEvent.click(screen.getByText('Next'));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('disables Previous button on first page', () => {
    const mockOnPageChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    const mockOnPageChange = jest.fn();
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('Next')).toBeDisabled();
  });
});

