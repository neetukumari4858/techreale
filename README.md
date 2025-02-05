# Book Manager

A Dashboard application that includes a login system, CRUD operations for products, API integration, state management, authorization handling, and a responsive UI that works across multiple device sizes.
## Instalation

Instructions on how to get a copy of the project and running on your local machine.

```bash
Clone the Project
npm install
npm start
```

### Authentication and Credentials


```bash
Authentication: JWT (Live API provided)
API_URL: https://dev.api.theforgeapp.io/api/v1/admin/auth/login

emaill:admin@gmail.com
password:123456

```
## Deployed Link
Open [https://techrealepracticaltask.netlify.app/](https://techrealepracticaltask.netlify.app/) to view it in your browser.


## Technologies

_Name the technologies used in the project._ 
* [Reactjs](https://reactjs.org/) 
* [Javascript](https://javascript.info//) 
* [React Router](https://reactrouter.com/) 
* [Material Ui](https://mui.com/material-ui/?srsltid=AfmBOooW0GhjF3tll_dCOhoUMgYgZl5ZLOJHsC_tTIMetdN8aS6kYmML/)  -(For Designing)
* [React Hook Form ](react-hook-form.com/) -(for form management)
* [Redux Toolkit](https://redux-toolkit.js.org//) -(for state management)
* [React Query ](https://handsonreact.com/docs/react-query/) - (for server-side data fetching)
* [Axios,JSON Server ](https://www.npmjs.com/package/json-server/) - (for fake API)

## Features
Name the features used in the project.


1. Login System
   * Integrate a live authentication API (provided by me).
   * Implement the login page with email and password fields.
   * Use Axios interceptors to automatically attach the JWT token to API requests.
   * Handle token expiration and unauthorized access by redirecting to the login page.

2. Dashboard Page

    * Implement a protected dashboard that is only accessible after logging in.
    * Create a sidebar navigation with links to the following pages:
      Dashboard
      Manage Products
      Manage Orders
      Logout
    * Implement dark mode toggle 
    * Ensure the layout is responsive

3 CRUD Operations for Products

    * Create Product:
    * Implement a form with input fields for name, description, price,category, and status.
    * On form submission, send a POST request to JSON Server to add a new product.

    * Read Products:
    * Fetch the list of products from JSON Server and display them in a Table.
    * Display product details such as name, description, price, category, status, etc.

    * Update Product:
    * Allow editing of product details (name, description, price, category, etc.).
    * On form submission, send a PUT request to update the product in JSON Server.

    * Delete Product:
    * Implement a delete functionality for removing products.
    * Show a confirmation dialog before deleting a product.
    * On confirmation, send a DELETE request to JSON Server.

4  Global API Interceptor

    * Use Axios interceptors to manage the JWT token for API requests.
    * If the token is expired or the user is unauthorized (status code 401), redirect them to the login page.
    * Ensure all the API requests are authenticated using the stored JWT token.

5. Search, Pagination, and Sorting
    * Implement search functionality for products by name, category, or description.
    * mplement pagination and sorting




