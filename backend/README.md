# Solesphere Backend API

RESTful API for the Solesphere sneaker e-commerce platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/solesphere
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

3. Start MongoDB:
```bash
# Make sure MongoDB is running
mongod
```

4. Run the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## Database Models

- **User**: Customer accounts and authentication
- **Product**: Sneaker products catalog
- **Order**: Purchase orders
- **Customization**: Custom shoe designs
- **Resell**: Pre-owned sneaker listings

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## File Uploads

Product images and resell listing photos are stored in the `/uploads` directory.
Maximum file size: 5MB per image.
Supported formats: JPG, PNG, GIF, WEBP

## Admin Routes

Some routes require admin privileges. Ensure the user role is set to 'admin'.
