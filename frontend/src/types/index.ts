// Product Types
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  features?: string[];
  sizes: number[];
  colors: string[];
  stock: number;
  rating?: number;
  reviews?: number;
  isNewProduct?: boolean;
  discount?: number;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Cart Types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: number;
  color: string;
}

// Order Types
export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
}

// Admin Types
export interface AdminUser {
  name: string;
  email: string;
}

// User Tracking Types
export interface UserSession {
  id: string;
  userId?: string;
  userName: string;
  userEmail?: string;
  location: string;
  device: string;
  startTime: string;
  lastActivity: string;
  currentPage: string;
  pageViews: number;
  cartAdditions: number;
  isActive: boolean;
  sessionDuration: number;
}

export interface RealtimeStats {
  activeUsers: number;
  pageViews: number;
  cartAdditions: number;
  conversions: number;
}

// Context Types
export interface ProductContextType {
  products: Product[];
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: number, color: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface OrderContextType {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getRecentOrders: (count: number) => Order[];
}

export interface UserTrackingContextType {
  userSessions: UserSession[];
  currentSession: UserSession | null;
  realtimeStats: RealtimeStats;
  startSession: (user?: User) => string;
  updateCurrentPage: (page: string) => void;
  trackCartAddition: () => void;
  trackConversion: () => void;
  updateActivity: () => void;
  endSession: () => void;
  getActiveSessions: () => UserSession[];
}
