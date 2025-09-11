import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Service } from '@/data/services';

export interface CartItem {
  service: Service;
  quantity: number;
  details: Record<string, any>;
  id: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { service: Service; quantity: number; details: Record<string, any> } }
  | { type: 'UPDATE_ITEM'; payload: { id: string; quantity: number; details: Record<string, any> } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

const initialState: CartState = {
  items: [],
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { service, quantity, details } = action.payload;
      const id = `${service.code}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newItem: CartItem = { service, quantity, details, id };
      
      return {
        ...state,
        items: [...state.items, newItem],
        isOpen: true,
      };
    }
    
    case 'UPDATE_ITEM': {
      const { id, quantity, details } = action.payload;
      return {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity, details } : item
        ),
      };
    }
    
    case 'REMOVE_ITEM': {
      const { id } = action.payload;
      return {
        ...state,
        items: state.items.filter(item => item.id !== id),
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    
    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      };
    
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };
    
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (service: Service, quantity: number, details: Record<string, any>) => void;
  updateItem: (id: string, quantity: number, details: Record<string, any>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (service: Service, quantity: number, details: Record<string, any>) => {
    dispatch({ type: 'ADD_ITEM', payload: { service, quantity, details } });
  };

  const updateItem = (id: string, quantity: number, details: Record<string, any>) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, quantity, details } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const value: CartContextType = {
    state,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}