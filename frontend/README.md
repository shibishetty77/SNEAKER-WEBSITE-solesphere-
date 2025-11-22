# Solesphere Frontend

React-based frontend for the Solesphere sneaker e-commerce platform with 3D customization.

## Features

- 🎨 Interactive 3D shoe customization using React Three Fiber
- 🛍️ Product browsing and filtering
- 🛒 Shopping cart and checkout
- 💼 Resell marketplace
- 📱 Fully responsive design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Environment Variables

Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Pages

- **Home**: Landing page with featured products
- **Store**: Product catalog with filters
- **Product Detail**: Individual product information
- **Customization**: 3D shoe customization studio
- **Resell Portal**: Buy/sell pre-owned sneakers
- **Checkout**: Order completion

## 3D Customization

The customization page uses:
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers for R3F
- **Three.js**: 3D graphics library

### Controls
- **Rotate**: Click and drag
- **Zoom**: Mouse wheel or pinch
- **Pan**: Disabled for better UX

## Styling

- Custom CSS with CSS variables for theming
- Dark mode by default
- Responsive breakpoints for mobile, tablet, desktop

## Components

- `Navbar`: Main navigation
- `Shoe3DModel`: Interactive 3D shoe renderer

## State Management

Currently using React's built-in state management. Future versions may include:
- Zustand for global state
- React Query for server state
