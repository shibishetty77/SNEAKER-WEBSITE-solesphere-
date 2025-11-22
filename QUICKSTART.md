# Quick Start Guide - Solesphere

Get the Solesphere sneaker platform running in minutes!

## Prerequisites

Before starting, ensure you have installed:
- ✅ Node.js (v14+) - [Download](https://nodejs.org/)
- ✅ MongoDB (v4.4+) - [Download](https://www.mongodb.com/try/download/community)
- ✅ npm or yarn

## 🚀 Quick Setup (5 minutes)

### Step 1: Start MongoDB

```bash
# Windows (Command Prompt or PowerShell)
mongod

# macOS/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# The .env file is already configured with defaults
# Start the backend server
npm run dev
```

✅ Backend will run at: **http://localhost:5000**

### Step 3: Frontend Setup

Open a **new terminal** window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend
npm start
```

✅ Frontend will run at: **http://localhost:3000**

## 🎉 You're Done!

The browser should automatically open to http://localhost:3000

## 🎨 Try the 3D Customization

1. Click **"Customize"** in the navigation menu
2. Select different shoe parts (Upper, Sole, Laces, Swoosh, Accent)
3. Choose colors from the palette or use the custom color picker
4. Rotate the shoe by clicking and dragging
5. Zoom in/out with mouse wheel
6. Save your design or add to cart!

## 📋 Test Features

### Browse Products
- Go to **Store** page
- Filter by category, brand, price, gender
- View product details

### Customize a Shoe
- Navigate to **Customize** page
- Change colors in real-time on the 3D model
- Save and add to cart

### Resell Portal
- Visit **Resell Portal**
- Browse pre-owned listings
- Create your own listing

### Checkout Process
- Add items to cart (click cart icon in navbar)
- Navigate to checkout
- Fill in shipping and payment details

## 🔧 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod --version  # Check if installed
mongod            # Start MongoDB
```

### Port Already in Use
If port 5000 or 3000 is already in use:

**Backend (.env):**
```
PORT=5001
```

**Frontend:**
```bash
# Set port before starting
PORT=3001 npm start
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## 📚 Default Credentials

The application currently doesn't require login to browse products. Authentication features are implemented in the API and can be integrated into the frontend.

## 🎯 Next Steps

1. **Add Products**: Use the API to add sneaker products to the database
2. **Customize UI**: Modify colors in `frontend/src/index.css`
3. **Add Features**: Extend functionality using the documented API
4. **Deploy**: Follow deployment guides for production

## 📖 Learn More

- [Full Documentation](./README.md)
- [Backend API Reference](./backend/README.md)
- [Frontend Guide](./frontend/README.md)

## 💬 Need Help?

Check the main README.md for detailed information about:
- API endpoints
- Project structure
- Advanced configuration
- Deployment options

---

**Happy Coding! 🎨👟**
