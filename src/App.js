import {useEffect, useState} from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {Store} from './components/pages';
import storedInventory from './constants/inventory.json';

import './App.scss';

const App = () => {
  const [inventory, setInventory] = useState(null);
  const [cart, setCart] = useState(null);

  const basename =
  process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : '';

  useEffect(() => {
    setInventory({...storedInventory});
  }, []);

  useEffect(() => {
    // set cart to have all keys to 0
    if (inventory) {
      const newCart = {};
      Object.keys(inventory.items).forEach((key) => {
        newCart[key] = 0;
      });
      setCart(newCart);
    }
  }, [inventory]);

  if (!inventory) {
    return null;
  }

  return (
    <div
      className="appContainer"
    >
      <BrowserRouter basename={basename}>
        <div className="pageContainer">
          <Routes>
            <Route
              path='/'
              element={
                <Store
                  potions={inventory.items}
                  cart={cart}
                  setCart={setCart}
                />
              }
            />
            <Route path='/test' element={<div>Test</div>} />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
};

export default App;
