import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-blue-900 px-4 py-2 border rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="bg-blue-900 px-4 py-2 border rounded-lg">
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-blue-900 px-6 py-2 border rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination

