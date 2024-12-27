# FoodCo: Product Catalog Management Interface

## Overview

This project is a responsive, user-friendly product catalog management interface built with React and Vite. It allows users to view, add, edit, and manage products in a catalog. Key features include pagination, search functionality, and filtering options.

![https://raw.githubusercontent.com/AJFX-01/foodco/refs/heads/main/src/assets/pix1.png](https://github.com/AJFX-01/foodco/blob/main/src/assets/pix1.png)
![https://raw.githubusercontent.com/AJFX-01/foodco/refs/heads/main/src/assets/pix2.png](https://github.com/AJFX-01/foodco/blob/main/src/assets/pix2.png)

---

## Features

- Display a list of products in a card-based layout.
- Add new products to the catalog.
- Edit existing product details.
- Search for products by name.
- Filter products by stock status.
- Navigate product lists using pagination.
- Fully responsive design for desktop, tablet, and mobile devices.

---

## Technologies Used

- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **State/Data Management**: React Query
- **Testing**: Jest, React Testing Library
- **Mock API**: json-server

---

## Installation

Follow these steps to set up and run the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/AJFX-01/foodco.git
   cd foodco
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install `json-server` globally:
   ```bash
   npm install -g json-server
   ```

---

## Running the Development Environment

1. Start `json-server` in a separate terminal:
   ```bash
   json-server --watch db.json --port 3333
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and visit [http://localhost:5173](http://localhost:5173) to view the application.

---

## Usage

### Viewing Products
- The main page displays a grid of product cards.
- Use the pagination controls at the bottom to navigate the product list.

### Searching and Filtering
- Search products by name using the search bar.
- Filter products by stock status using the dropdown next to the search bar.

### Adding a New Product
1. Click the **Add New Product** button.
2. Fill in the product details in the form.
3. Click **Add Product** to save the new product.

### Editing a Product
1. Click **View Details** on a product card.
2. In the product details modal, click **Edit Product**.
3. Update the product details in the form.
4. Click **Update Product** to save changes.

---

## Project Structure

```plaintext
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
```

---

## API Configuration

This project uses `json-server` as a mock API. The API base URL is:

```javascript
const API_URL = 'http://localhost:3333/products';
```

Ensure the port or host is updated if you modify the `json-server` setup.

---

## Running Tests

Run the test suite using Jest and React Testing Library:

```bash
npm test
```

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Thought Process

### Design Considerations
1. **Component Structure**: Modular and reusable components for scalability.
2. **State Management**: React Context for simplicity and React Query for efficient data fetching and caching.
3. **UI/UX Design**: Clean, intuitive, and responsive for seamless usage across devices.
4. **Testing**: Unit tests for critical components to ensure reliability.

### Trade-offs and Limitations
1. **API**: Relies on `json-server` for development. Integration with a real backend is needed for production.
2. **Scalability**: May need architectural changes for large catalogs.
3. **Authentication**: No user authentication implemented.
4. **Image Handling**: Currently supports only image URLs; no upload functionality.
5. **Performance**: Virtualization might be necessary for very large product lists.

---

## Contact

For questions or feedback, open an issue on the GitHub repository or contact the maintainer:

- Email: [opeyemi.ajegbomogun@yahoo.com](mailto:opeyemi.ajegbomogun@yahoo.com)

---

Happy coding! 🚀
