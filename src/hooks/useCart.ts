import { useState } from 'react'
import inventory from '../data/inventory.json'

interface Inventory {
  id: number
  name: string
  description: string
  price: number
  discount: number
  images: Image[]
  quantity: number
}

interface Image {
  fullSize: string
  thumbnail: string
}

interface CartEntry {
  id: number
  quantity: number
}

export interface CartFunctions {
  addToCart: (productId: number, quantity: number) => void
  removeFromCart: (productId: number) => void
  getCartCount: () => number
  getInventoryItem: (id: number) => Inventory
}

const useCart = () => {
  const [cart, setCart] = useState<CartEntry[]>([])

  const addToCart = (productId: number, quantity: number) => {
    const product = inventory.find((item) => item.id === productId)
    if (product) {
      const cartEntry = cart.find((item) => item.id === product.id)
      if (cartEntry) {
        setCart(
          cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          )
        )
      } else {
        setCart([...cart, { id: product.id, quantity }])
      }
    }
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  // const getCartCount = () => cart.length
  const getCartCount = () => cart.reduce((acc, item) => acc + item.quantity, 0)

  const getInventoryItem = (id: number) => inventory.find((product) => product.id === id)

  return { addToCart, removeFromCart, getCartCount, getInventoryItem } as CartFunctions
}

export default useCart
