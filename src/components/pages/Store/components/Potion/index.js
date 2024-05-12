import styles from './styles.module.scss';

const Potion = ({cart, potion, setCart}) => {
  const id = potion.id;
  const quantity = cart[id] || 0;

  const subtract = () => {
    setCart({
      ...cart,
      [id]: quantity - 1 < 0 ? 0 : +quantity - 1,
    });
  };

  const add = () => {
    setCart({
      ...cart,
      [id]: +quantity + 1,
    });
  };

  const updateQuantity = (event) => {
    const value = event.target.value.replace('-', '');

    setCart({
      ...cart,
      [id]: value === '' ? '' :+value,
    });
  };

  const handleBlur = () => {
    if (cart[id] === '') {
      setCart({
        ...cart,
        [id]: 0,
      });
    }
  };

  return (
    <div className={styles.potion}>
      <h3>{potion.name}</h3>
      {/* <img src={potion.imageURL} alt={potion.name} /> */}
      <div>${potion.price}</div>
      <div className={styles.quantityContainer}>
        <button className={styles.subtract} onClick={subtract}>-</button>
        <input
          type="number"
          value={cart[id]}
          onChange={updateQuantity}
          onBlur={handleBlur}
          disabled
        />
        <button className={styles.add} onClick={add}>+</button>
      </div>
    </div>
  );
};

export default Potion;
