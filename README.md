# Solesphere - Premium Sneaker E-Commerce Platform

A modern, full-stack sneaker e-commerce website with **3D customization** capabilities, built using **React**, **Node.js**, **Express**, and **MongoDB**.

## 🌟 Features

### 🛍️ E-Commerce Features
- Browse extensive sneaker catalog
- Advanced filtering (category, brand, price, gender)
- Product detail pages with multiple images
- Shopping cart and wishlist
- Secure checkout process
- User authentication and profiles

### 💼 Resell Portal
- Buy and sell pre-owned sneakers
- Authentication verification system
- Condition ratings and seller profiles
- Secure transaction handling

### 🎯 Additional Features
- Responsive design for all devices
- Modern dark theme UI
- Product reviews and ratings
- Order tracking
- Admin panel capabilities

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Navigation
- **React Three Fiber** - 3D rendering
- **@react-three/drei** - 3D helpers
- **Three.js** - 3D graphics
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/solesphere
# JWT_SECRET=your_secret_key

# Start the server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
WT/
├── backend/
│   ├── models/           # Database models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Customization.js
│   │   └── Resell.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── customizations.js
│   │   └── resell.js
│   ├── middleware/       # Custom middleware
│   │   ├── auth.js
│   │   └── upload.js
│   ├── uploads/          # File uploads
│   ├── server.js         # Entry point
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/   # Reusable components
    │   │   ├── Navbar.js
    │   │   └── Shoe3DModel.js
    │   ├── pages/        # Page components
    │   │   ├── HomePage.js
    │   │   ├── StorePage.js
    │   │   ├── ProductDetailPage.js
    │   │   ├── CustomizationPage.js
    │   │   ├── ResellPortalPage.js
    │   │   └── CheckoutPage.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🎮 Usage

### For Customers

1. **Browse Products**: Navigate to the Store page to explore sneakers
2. **View Details**: Click on any product to see detailed information
3. **Customize**: Click "Customize" to design your own unique sneaker
4. **Add to Cart**: Select size and add products to your cart
5. **Checkout**: Complete your purchase with secure payment

### For Sellers

1. **Navigate to Resell Portal**
2. **Click "Sell Your Sneakers" tab**
3. **Fill in product details** and upload photos
4. **Set your price** and submit for verification
5. **Track your listing** and manage sales

### 3D Customization

1. **Select a base shoe** or start from customization page
2. **Choose section** (Upper, Sole, Laces, Swoosh, Accent)
3. **Pick colors** from preset options or use custom color picker
4. **Rotate and zoom** to view from all angles
5. **Save design** or add directly to cart

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/featured` - Get featured products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Customizations
- `POST /api/customizations` - Create customization
- `GET /api/customizations` - Get user customizations
- `GET /api/customizations/public` - Get public customizations
- `PUT /api/customizations/:id` - Update customization
- `DELETE /api/customizations/:id` - Delete customization

### Resell
- `GET /api/resell` - Get all resell listings
- `POST /api/resell` - Create resell listing
- `GET /api/resell/:id` - Get listing by ID
- `PUT /api/resell/:id` - Update listing
- `DELETE /api/resell/:id` - Delete listing

## 🎨 Color Customization Options

The 3D customization feature allows changing colors for:
- **Upper**: Main shoe body
- **Sole**: Bottom rubber sole
- **Laces**: Shoelace color
- **Swoosh**: Brand accent/logo
- **Accent**: Heel and additional details

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation
- CORS configuration
- Secure file uploads

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🚧 Future Enhancements

- [ ] Add payment gateway integration (Stripe/PayPal)
- [ ] Implement real-time inventory management
- [ ] Add social media sharing for custom designs
- [ ] Implement email notifications
- [ ] Add advanced 3D models with textures
- [ ] Implement AR try-on feature
- [ ] Add live chat support
- [ ] Implement loyalty program

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any questions or support, please contact us at support@solesphere.com

---

Built with ❤️ for sneaker enthusiasts
