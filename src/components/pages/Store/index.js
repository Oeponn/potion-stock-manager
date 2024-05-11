import inventory from '../../../constants/inventory.json';
import styles from './styles.module.scss';

const Cart = () => {
  return (
    <div className={styles.cart}>
      <h1>Cart</h1>
    </div>
  );
};

const Item = ({potion}) => {
  return (
    <div className={styles.potion}>
      <h3>{potion.name}</h3>
    </div>
  );
};

const Inventory = ({potions}) => {
  return (
    <div className={styles.inventory}>
      {potions.map((potion) => {
        return <Item potion={potion} key={potion.name} />;
      })}
    </div>
  );
};

const Checkout = () => {
  // Checkout button on the right, cancel on the left
  return (
    <div className={styles.checkoutContainer}>
      <button>Cancel</button>
      <button>Checkout</button>
    </div>
  );
};

const Store = () => {
  return (
    <div className={styles.storeContainer}>
      <Cart />
      <Inventory potions={inventory.items} />
      <Checkout />
    </div>
  );
};

export default Store;
