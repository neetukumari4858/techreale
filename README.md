# Book Manager 

Developed a Dashboard with Authentication, CRUD Operations and Responsive UI


## Instalation

Instructions on how to get a copy of the project and running on your local machine.
```bash
 Clone the Project
 npm install
 npm run serve-json (To start JSON Server)
 npm start
```
## Authentication Credentials

```bash
Authentication: JWT (Live API provided)
API_URL: https://dev.api.theforgeapp.io/api/v1/admin/auth/login

emaill:admin@gmail.com
password:123456

```

### Live Project Link

Open [https://techrealebookmanager.netlify.app/) to view it in your browser.

## Technologies

_Name the technologies used in the project._ 

* [React](https://reactjs.org/)
* [Javascript](https://javascript.info/) 
* [React Router](https://spring.io/) 
* [React Hook Form ](https://reactrouter.com/) - For form management
* [Redux Toolkit](https://redux-toolkit.js.org//) - For State management
* [React Query ](https://medium.com/bina-nusantara-it-division/understanding-react-query-11e56960e90c/) - for server-side data fetching
* [Material UI ](https://mui.com/material-ui/?srsltid=AfmBOooNKLiajaILtLFUcOKwTe7K3dusmgtmApt3vGfW3AC94v03sON8/) - For Designing
* [JSON Server](https://www.npmjs.com/package/json-server/) 



## Features 

_The  Features used in the project._ 

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
    * Implement pagination and sorting







