// import {useEffect, useState} from 'react';
import {Cart, Inventory} from './components';
import styles from './styles.module.scss';

const Checkout = ({clearCart}) => {
  return (
    <div className={styles.checkoutContainer}>
      <button
        className={styles.cancel}
        onClick={clearCart}>Cancel / Clear Cart
      </button>
      <button className={styles.checkout}>Checkout</button>
    </div>
  );
};

const Store = ({cart, potions, setCart}) => {
  if (!potions || !cart) {
    return null;
  }
  const clearCart = () => {
    const newCart = {};
    Object.keys(potions).forEach((key) => {
      newCart[key] = 0;
    });
    setCart(newCart);
  };

  return (
    <div className={styles.storeContainer}>
      <Cart cart={cart} potions={potions} />
      <Inventory potions={potions} cart={cart} setCart={setCart} />
      <Checkout clearCart={clearCart} />
    </div>
  );
};

export default Store;
