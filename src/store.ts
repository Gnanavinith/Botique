import { create } from 'zustand';
import { CartItem, Product, AuthState } from './types';
import toast from 'react-hot-toast';

interface StoreState extends AuthState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  user: null,
  isAuthenticated: false,
  addToCart: (product: Product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      toast.success(`${product.name} added to cart!`, {
        position: 'bottom-right',
        duration: 2000,
      });
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId: number) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId: number, quantity: number) =>
    set((state) => ({
      cart: quantity === 0
        ? state.cart.filter((item) => item.id !== productId)
        : state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
    })),
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({
      user: { email, name: email.split('@')[0] },
      isAuthenticated: true,
    });
  },
  signup: async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({
      user: { email, name },
      isAuthenticated: true,
    });
  },
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      cart: [],
    });
  },
  get totalItems() {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0);
  },
  get totalPrice() {
    return get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));