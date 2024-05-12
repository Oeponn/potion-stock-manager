import styles from './styles.module.scss';

const Cart = ({cart, potions}) => {
  let totalPrice = 0;
  Object.keys(cart).forEach((key) => {
    totalPrice += potions[key].price * cart[key];
  });

  totalPrice = totalPrice.toFixed(2);

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartList}>
        <p>In Cart:</p>
        <ul>
          {Object.keys(cart).map((key) => {
            if (!cart[key]) {
              return null;
            }
            return (
              <li key={key}>
                {cart[key]} x {potions[key].name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.cartTotal}>
        <h1>Total:</h1>
        <h2>${totalPrice}</h2>
      </div>
    </div>
  );
};

export default Cart;
