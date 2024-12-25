# Product Catalog Management Interface

## Overview

This project is a responsive and user-friendly product catalog management interface built with React and Vite. It allows users to view, add, edit, and manage products in a catalog. The interface includes features such as pagination, search functionality, and filtering options.

![Product Catalog Screenshot](https://via.placeholder.com/800x400?text=Product+Catalog+Screenshot)

## Features

- 📋 Display a list of products in a card-based layout
- ➕ Add new products to the catalog
- 🖊️ Edit existing product details
- 🔍 Search products by name
- 🏷️ Filter products by stock status
- 📄 Pagination for easy navigation through product lists
- 📱 Responsive design for desktop, tablet, and mobile devices

## Technologies Used

- React
- TypeScript
- Vite
- TailwindCSS
- React Query
- Jest and React Testing Library

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/AJFX-01/foodco.git
   cd foodco
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Install json-server globally:
   \`\`\`bash
   npm install -g json-server
   \`\`\`

## Running the Development Environment

1. Start json-server (in a separate terminal):
   \`\`\`bash
   json-server --watch db.json --port 3333
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open your browser and visit `http://localhost:5173` to view the application.

## Usage

### Viewing Products

- The main page displays a grid of product cards.
- Use the pagination controls at the bottom of the page to navigate through the product list.

### Searching and Filtering

- Use the search bar at the top of the page to search for products by name.
- Use the dropdown menu next to the search bar to filter products by stock status.

### Adding a New Product

1. Click the "Add New Product" button at the top of the page.
2. Fill in the product details in the form that appears.
3. Click "Add Product" to save the new product to the catalog.

### Editing a Product

1. Click the "View Details" button on a product card.
2. In the product details modal, click "Edit Product".
3. Modify the product details in the form that appears.
4. Click "Update Product" to save the changes.

## Development

### Project Structure

\`\`\`
src/
├── components/
│   ├── AddEditProductForm.tsx
│   ├── Pagination.tsx
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── ProductModal.tsx
│   └── SearchFilter.tsx
├── context/
│   └── ProductContext.tsx
├── api/
│   └── mockApi.ts
├── types/
│   └── product.ts
├── db.json
├── App.tsx
└── main.tsx
\`\`\`

## API Configuration

The project now uses json-server to simulate a RESTful API. The API URL is configured as:

\`\`\`javascript
const API_URL = 'http://localhost:3333/products';
\`\`\`

Make sure to update this URL if you change the port or host for json-server.

### Running Tests

To run the test suite, use the following command:

\`\`\`bash
npm test
\`\`\`

This will run all test files in the project using Jest and React Testing Library.

## Contributing

Contributions to this project are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please ensure that your code adheres to the existing style and passes all tests before submitting a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please open an issue on the GitHub repository or contact the maintainer at [opeyemi.ajegbomogun@yahoo.com](mailto:your-email@example.com).

## Thought Process

While building this application, the following considerations guided the development process:

1. **Component Structure**: We aimed for a modular design with reusable components to improve maintainability and scalability.
2. **State Management**: We chose to use React Context for global state management, as it provides a good balance between simplicity and functionality for this scale of application.
3. **Data Fetching**: React Query was selected for data fetching and caching to optimize performance and provide a smooth user experience.
4. **UI/UX Design**: We focused on creating a clean, intuitive interface with responsive design principles to ensure usability across different devices.
5. **Testing**: We implemented unit tests for critical components to ensure reliability and ease of future development.

## Trade-offs and Limitations

While the current implementation provides a solid foundation, there are some trade-offs and limitations to consider:

1. **API**: The application now uses json-server as a mock API, which provides a more realistic development environment. However, for production use, integration with a real backend would still be necessary.
2. **Scalability**: The current design may need to be revisited if the product catalog grows significantly in size or complexity.
3. **Authentication**: The application doesn't include user authentication, which would be crucial for a real-world product management system.
4. **Image Handling**: The current implementation doesn't support image uploads, relying instead on image URLs.
5. **Performance Optimization**: While React Query provides some optimization, additional measures like virtualization might be necessary for very large product lists.

---

Happy coding! 🚀

