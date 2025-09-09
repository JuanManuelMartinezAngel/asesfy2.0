import React, { createContext, useContext, useState, ReactNode } from 'react'
import { CartItem } from '@/lib/supabase'

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (slug: string) => void
  clearCart: () => void
  isInCart: (slug: string) => boolean
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      // Avoid duplicates
      if (prev.some(cartItem => cartItem.slug === item.slug)) {
        return prev
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (slug: string) => {
    setCart(prev => prev.filter(item => item.slug !== slug))
  }

  const clearCart = () => {
    setCart([])
  }

  const isInCart = (slug: string) => {
    return cart.some(item => item.slug === slug)
  }

  const cartCount = cart.length

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}