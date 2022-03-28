import React from 'react'

import Nav from './components/Nav'
import ProductInfo from './components/ProductInfo'
import { CartContextProvider } from './contexts/CartContext'
import useCart from './hooks/useCart'
import styles from './styles/App.module.scss'

function App() {
  useCart()
  return (
    <CartContextProvider>
      <main className={styles.layout}>
        <Nav />
        <ProductInfo id={1} />
      </main>
    </CartContextProvider>
  )
}

export default App
