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


## API Endpoints

- `/api/products` - Product management
- `/api/cart` - Shopping cart operations
- `/api/checkout` - Checkout processing
