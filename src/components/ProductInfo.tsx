import React, { useContext, useState } from 'react'

import CartContext from '../contexts/CartContext'
import useBreakpoint from '../hooks/useBreakpoint'
import styles from '../styles/ProductInfo.module.scss'
import { ReactComponent as MinusIcon } from '../images/icon-minus.svg'
import { ReactComponent as PlusIcon } from '../images/icon-plus.svg'
import { ReactComponent as PrevIcon } from '../images/icon-previous.svg'
import { ReactComponent as NextIcon } from '../images/icon-next.svg'
import { ReactComponent as CartIcon } from '../images/icon-cart.svg'

interface Props {
  id: number
}

const ProductInfo = ({ id }: Props) => {
  const cart = useContext(CartContext)
  const { name, description, price, discount, images } = cart!.getInventoryItem(1)
  const [quantity, setQuantity] = useState(1)
  const maxQuantity = 99
  const { isMobile } = useBreakpoint()
  const [currentImage, setCurrentImage] = useState(0)

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage((current) => current - 1)
    } else {
      setCurrentImage(images.length - 1)
    }
  }
  const nextImage = () => {
    if (currentImage < images.length - 1) {
      setCurrentImage((current) => current + 1)
    } else {
      setCurrentImage(0)
    }
  }
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((quantity) => quantity - 1)
    }
  }
  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity((quantity) => quantity + 1)
    }
  }
  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(0 + e.target.value.replace(/[^0-9]/g, ''))
    setQuantity(value)
  }
  const onQuantityBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let value = parseInt(0 + e.target.value.replace(/[^0-9]/g, ''))
    if (value < 0 || e.target.value.length === 0) {
      value = 0
    }
    if (value > maxQuantity) {
      value = maxQuantity
    }
    setQuantity(value)
  }
  const onQuantityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.length === 1 && !/[0-9]/.test(e.key)) {
      e.preventDefault()
    }
  }
  const addToCart = () => {
    cart && cart.addToCart(id, quantity)
  }

  return (
    <div className={styles.layout}>
      <div className={styles.imageSection}>
        <div className={styles.mainImageContainer}>
          <img src={images[currentImage].fullSize} alt={`product ${currentImage + 1}`} />
          {isMobile && (
            <>
              <button className={styles.prevButton} onClick={prevImage}>
                <PrevIcon />
              </button>
              <button className={styles.nextButton} onClick={nextImage}>
                <NextIcon />
              </button>
            </>
          )}
        </div>
        {!isMobile && (
          <div className={styles.thumbnailContainer}>
            {images.map((image, i) => (
              <button
                className={currentImage === i ? styles.thumbnailSelected : ''}
                onClick={() => setCurrentImage(i)}
                key={i}
              >
                <img src={image.thumbnail} alt={`thumbnail ${i + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={styles.infoSection}>
        <span className={styles.companyTitle}>Sneaker Company</span>
        <h1 className={styles.heading}>{name}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.priceSection}>
          <span className={styles.discountedPrice}>${(price * discount).toFixed(2)}</span>
          {discount > 0 && (
            <>
              <span className={styles.discount}>{Math.ceil((1 - discount) * 100)}%</span>
              <span className={styles.originalPrice}>${price.toFixed(2)}</span>
            </>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.quantitySection}>
            <button onClick={decreaseQuantity}>
              <MinusIcon />
            </button>
            <input
              type="number"
              value={quantity.toString()}
              onInput={onQuantityChange}
              onBlur={onQuantityBlur}
              onKeyDown={onQuantityKeyDown}
              min="0"
              max="99"
              aria-label="quantity"
            />
            <button onClick={increaseQuantity}>
              <PlusIcon />
            </button>
          </div>
          <button className={styles.addCart} onClick={addToCart} disabled={quantity === 0}>
            <CartIcon />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
