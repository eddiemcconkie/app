import React, { useContext, useState } from 'react'

import styles from '../styles/Nav.module.scss'
import menuIcon from '../images/icon-menu.svg'
import logo from '../images/logo.svg'
import closeIcon from '../images/icon-close.svg'
// import cartIcon from '../images/icon-cart.svg'
import avatar from '../images/image-avatar.png'
import useBreakpoint from '../hooks/useBreakpoint'
import { ReactComponent as CartIcon } from '../images/icon-cart.svg'
import CartContext from '../contexts/CartContext'

const Nav = () => {
  const { isDesktop } = useBreakpoint()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cart = useContext(CartContext)
  const cartCount = cart?.getCartCount() ?? 0

  return (
    <nav className={styles.layout}>
      {!isDesktop && (
        <>
          <button className={styles.button} onClick={() => setIsMenuOpen(true)}>
            <img src={menuIcon} alt="menu" />
          </button>
          {isMenuOpen && (
            <div className={styles.overlay}>
              <ul className={styles.navSide}>
                <button className={styles.button} onClick={() => setIsMenuOpen(false)}>
                  <img src={closeIcon} alt="close" />
                </button>
                <li>
                  <button className={styles.linkSide}>Collections</button>
                </li>
                <li>
                  <button className={styles.linkSide}>Men</button>
                </li>
                <li>
                  <button className={styles.linkSide}>Women</button>
                </li>
                <li>
                  <button className={styles.linkSide}>About</button>
                </li>
                <li>
                  <button className={styles.linkSide}>Contact</button>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
      <img className={styles.logo} src={logo} alt="sneakers logo" />
      {isDesktop && (
        <ul className={styles.navTop}>
          <li>
            <button className={styles.linkTop}>Collections</button>
          </li>
          <li>
            <button className={styles.linkTop}>Men</button>
          </li>
          <li>
            <button className={styles.linkTop}>Women</button>
          </li>
          <li>
            <button className={styles.linkTop}>About</button>
          </li>
          <li>
            <button className={styles.linkTop}>Contact</button>
          </li>
        </ul>
      )}
      <button className={styles.button}>
        <CartIcon />
        {cartCount > 0 && (
          <div className={styles.cartCount} key={cartCount}>
            {cartCount}
          </div>
        )}
      </button>
      <button className={styles.button}>
        <img className={styles.avatar} src={avatar} alt="profile" />
      </button>
    </nav>
  )
}

export default Nav
