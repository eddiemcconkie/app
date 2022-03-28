import React, { createContext } from 'react'

import useCart, { CartFunctions } from '../hooks/useCart'

const CartContext = createContext<CartFunctions | null>(null)

export const CartContextProvider: React.FC = ({ children }) => {
  const cart = useCart()

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}

export default CartContext
