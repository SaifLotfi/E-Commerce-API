
<h1 align="center">E-Commerce API</h1>


## Overview

This Is my implementation for the backend part of the [E-commerce MERN Stack course by BradTraversy](https://github.com/bradtraversy/proshop-v2)

## Features

- **Product Management**: Create, update, and delete products with ease. Organize products into categories and manage inventory.
- **User Accounts**: Allow users to create accounts, view order history, and manage their profiles.
- **Shopping Cart**: Implement a shopping cart system for users to add and remove items.
- **Order Processing**: Manage orders, track shipments, and handle payment processing.
- **Reviews and Ratings**: Enable customers to leave product reviews and ratings.
- **Search and Filters**: Implement search functionality and filtering options for products.
- **Admin Dashboard**: Provide an admin dashboard for easy store management.
- **Security**: Implement authentication and authorization mechanisms to protect sensitive data.
- **Payment Integration**: Support various payment gateways for seamless transactions.


### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/SaifLotfi/E-Commerce-API.git
   ```

2. Navigate to the project directory:

   ```bash
   cd E-Commerce-API
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the project root:

   ```bash
   touch .env
   ```

2. Configure the `.env` file with your environment-specific settings. You can use the provided `.env.example` as a template.

### Running the Server

To start the API server, use the following command:

```bash
npm start
```

The API will be accessible locally at `http://localhost:5000`.

## Usage

### Authentication

E-Commerce API uses token-based authentication. To access protected endpoints, users need to obtain an authentication token. Here's how it works:

- **Sign Up**: Users can create a new account by sending a `POST` request to `/api/auth/signup`.

- **Log In**: After signing up, users can log in by sending a `POST` request to `/api/auth/login`. They will receive an authentication token in response.

- **Authorization**: To access protected endpoints, include the obtained token in the `Authorization` header of your requests.

### API Endpoints

E-Commerce API provides a variety of endpoints to manage your e-commerce platform. Some of the main API endpoints include:

#### User Endpoints

- **Get User Profile**: `GET /api/users/profile`
- **Update User Profile**: `PUT /api/users/profile`
- **Register User**: `POST /api/users`
- **Auth User & Get Token**: `POST /api/users/login`
- **Get all Users**: `GET /api/users`

#### Product Endpoints

- **Fetch all Products**: `GET /api/products`
- **Fetch single Product**: `GET /api/products/:id`
- **Delete a Product**: `DELETE /api/products/:id`
- **Create a Product**: `POST /api/products`
- **Update a Product**: `PUT /api/products/:id`

#### Upload Endpoints

- **Upload Image**: `POST /api/upload`



For a complete list of available endpoints and their usage, please refer to the API documentation or the code.

