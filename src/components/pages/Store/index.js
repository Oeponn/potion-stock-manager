import {Cart, Inventory} from './components';
import styles from './styles.module.scss';

const radioClassName = (paymentMethod, value) => {
  if (paymentMethod === value) {
    return [styles.radio, styles.activeRadio].join(' ');
  } else {
    return styles.radio;
  }
};
const PaymentMethod = ({paymentMethod, setPaymentMethod}) => {
  return (
    <div className={styles.paymentMethodContainer}>
      <form>
        <label
          className={radioClassName(paymentMethod, 'cash')}
        >
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={paymentMethod === 'cash'}
            onChange={() => setPaymentMethod('cash')}
          />
        Cash
        </label>

        <label
          className={radioClassName(paymentMethod, 'paypal')}
        >
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={() => setPaymentMethod('paypal')}
          />
        Paypal
        </label>

        <label
          className={radioClassName(paymentMethod, 'venmo')}
        >
          <input
            type="radio"
            name="payment"
            value="venmo"
            checked={paymentMethod === 'venmo'}
            onChange={() => setPaymentMethod('venmo')}
          />
        Venmo
        </label>

        <label
          className={radioClassName(paymentMethod, 'zelle')}
        >
          <input
            type="radio"
            name="payment"
            value="zelle"
            checked={paymentMethod === 'zelle'}
            onChange={() => setPaymentMethod('zelle')}
          />
        Zelle
        </label>
      </form>
    </div>
  );
};

const Checkout = ({appendSheetData, clearCart}) => {
  return (
    <div className={styles.checkoutContainer}>
      <button
        className={styles.cancel}
        onClick={clearCart}>Cancel / Clear Cart
      </button>
      <button
        className={styles.checkout}
        onClick={appendSheetData}
      >Checkout
      </button>
    </div>
  );
};

const Store = ({
  cart,
  potions,
  setCart,
  appendSheetData,
  paymentMethod,
  setPaymentMethod,
}) => {
  if (!potions || !cart) {
    return null;
  }
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear cart?')) {
      const newCart = {};
      Object.keys(potions).forEach((key) => {
        newCart[key] = 0;
      });
      setCart(newCart);
      setPaymentMethod('cash');
    }
  };

  return (
    <div className={styles.storeContainer}>
      <Cart cart={cart} potions={potions} />
      <Inventory potions={potions} cart={cart} setCart={setCart} />
      <PaymentMethod
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <Checkout clearCart={clearCart} appendSheetData={appendSheetData} />
    </div>
  );
};

export default Store;
