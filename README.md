# Solesphere

A full-stack sneaker e-commerce platform with 3D customization capabilities.

## Overview

Solesphere is a MERN stack application that allows users to browse, customize, and purchase sneakers. The platform includes a resell marketplace for pre-owned footwear and features 3D product customization using React Three Fiber.

## Features

### E-Commerce
- Product catalog with filtering (category, brand, price, gender)
- Shopping cart and wishlist functionality
- User authentication and profile management
- Order placement and tracking
- Product reviews and ratings

### 3D Customization
- Interactive 3D sneaker customization
- Color selection for shoe components (upper, sole, laces, swoosh, accent)
- Real-time preview with rotation and zoom
- Save and share custom designs

### Resell Marketplace
- Buy and sell pre-owned sneakers
- Condition ratings and seller profiles
- Listing management and tracking
- Image upload for listings

### Admin Panel
- Product management (CRUD operations)
- Order status management
- User oversight

## Architecture

The application follows a standard MERN architecture:

- **Frontend**: React 18 with React Router for navigation
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **File Uploads**: Multer middleware
- **3D Rendering**: React Three Fiber and Three.js

## Tech Stack

### Frontend
- React 18
- React Router DOM
- React Three Fiber
- @react-three/drei
- Three.js
- Lucide React
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- express-validator
- express-rate-limit
- helmet
- express-mongo-sanitize
- DOMPurify

## Installation

### Prerequisites
- Node.js 14+
- MongoDB 4.4+
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/solesphere
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Backend server port | No (default: 5000) |
| MONGODB_URI | MongoDB connection string | No (default: localhost) |
| JWT_SECRET | Secret for JWT access tokens | Yes |
| JWT_REFRESH_SECRET | Secret for JWT refresh tokens | Yes |
| NODE_ENV | Environment (development/production) | No |
| ALLOWED_ORIGINS | Comma-separated allowed CORS origins | No |

## Project Structure

```
solesphere/
├── backend/
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   ├── upload.js           # File upload configuration
│   │   ├── security.js          # Security middleware (rate limiting, sanitization)
│   │   └── responseHandler.js   # Standardized response formatter
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Product.js           # Product schema
│   │   ├── Order.js             # Order schema
│   │   ├── Customization.js     # Customization schema
│   │   └── Resell.js            # Resell listing schema
│   ├── routes/
│   │   ├── auth.js              # Authentication endpoints
│   │   ├── products.js          # Product endpoints
│   │   ├── orders.js            # Order endpoints
│   │   ├── customizations.js    # Customization endpoints
│   │   └── resell.js            # Resell marketplace endpoints
│   ├── uploads/                 # Uploaded product images
│   ├── server.js                # Backend entry point
│   ├── .env.example             # Environment variables template
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/          # Reusable components
    │   ├── pages/               # Page components
    │   ├── context/             # React context providers
    │   └── App.js               # Main application component
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `POST /api/products/:id/reviews` - Add product review (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/status` - Update order status (admin)
- `GET /api/orders/admin/all` - Get all orders (admin)

### Customizations
- `POST /api/customizations` - Create customization (protected)
- `GET /api/customizations` - Get user customizations (protected)
- `GET /api/customizations/public` - Get public customizations
- `GET /api/customizations/:id` - Get customization by ID (protected)
- `PUT /api/customizations/:id` - Update customization (protected)
- `DELETE /api/customizations/:id` - Delete customization (protected)
- `POST /api/customizations/:id/like` - Like/unlike customization (protected)

### Resell
- `GET /api/resell` - Get all resell listings with filters
- `POST /api/resell` - Create resell listing (protected)
- `GET /api/resell/:id` - Get listing by ID
- `PUT /api/resell/:id` - Update listing (protected)
- `DELETE /api/resell/:id` - Delete listing (protected)

## Security

- JWT-based authentication with access and refresh tokens
- Password hashing with bcrypt (12 rounds)
- Rate limiting on authentication endpoints (5 requests/15 minutes)
- CORS configuration with origin whitelist
- Input sanitization (NoSQL injection, XSS, HTTP parameter pollution)
- Helmet security headers
- File upload validation (type, size limits)
- Environment-based error handling (no stack traces in production)

## Deployment

### Backend Deployment

1. Set environment variables in production
2. Build and deploy to hosting platform (e.g., Render, Railway, AWS)
3. Ensure MongoDB is accessible (Atlas or self-hosted)
4. Set `NODE_ENV=production`

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy to hosting platform (e.g., Vercel, Netlify)
3. Update `ALLOWED_ORIGINS` in backend environment variables

## License

MIT License
