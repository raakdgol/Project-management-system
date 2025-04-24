# Product Management System

A full-stack web application for managing products, built with Node.js, Express, and MongoDB.

## Features

- Product management (Create, Read, Update, Delete)
- Shopping cart functionality
- Checkout system
- Product image upload
- Responsive user interface
- RESTful API architecture

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Handling**: express-fileupload
- **Security**: CORS enabled

## Project Structure

```
├── config/         # Configuration files
├── controllers/    # Business logic
├── models/         # Database schemas
├── public/         # Static files
│   ├── styles.css
│   ├── script.js
│   └── index.html
├── routes/         # API endpoints
├── server.js       # Main application file
└── package.json    # Project dependencies
```

## Installation

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
npm install
```

3. Create a .env file in the root directory and add your environment variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

4. Start the server

```bash
npm start
```

The application will be running at `http://localhost:5000`

## API Endpoints

- `/api/products` - Product management
- `/api/cart` - Shopping cart operations
- `/api/checkout` - Checkout processing
