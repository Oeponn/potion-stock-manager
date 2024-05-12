/* eslint-disable max-len */
import {useEffect, useState} from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {Login, Header, Store} from './components/pages';
import storedInventory from './constants/inventory.json';

import './App.scss';

const App = () => {
  const [token, setToken] = useState('');
  const [inventory, setInventory] = useState({});
  const [cart, setCart] = useState({});
  const [sheetId, setSheetId] = useState('');
  const [sheetName, setSheetName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const basename =
    process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : '';

  useEffect(() => {
    setInventory({...storedInventory});
    const storedSheetId = localStorage.getItem('potionSheetId');
    const storedSheetName = localStorage.getItem('potionSheetName');
    const storedPaymentMethod = localStorage.getItem('potionPaymentMethod');

    // console.log('storedSheetId', storedSheetId, typeof storedSheetId);
    // console.log('storedSheetName', storedSheetName, typeof storedSheetName);
    // console.log('storedPaymentMethod', storedPaymentMethod, typeof storedPaymentMethod);

    if (storedSheetId) setSheetId(storedSheetId);
    if (storedSheetName) setSheetName(storedSheetName);
    if (storedPaymentMethod) setPaymentMethod(storedPaymentMethod);
  }, []);

  useEffect(() => {
    if (Object.keys(cart).length === 0) return;
    localStorage.setItem('potionCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('potionSheetId', sheetId);
  }, [sheetId]);

  useEffect(() => {
    localStorage.setItem('potionSheetName', sheetName);
  }, [sheetName]);

  useEffect(() => {
    localStorage.setItem('potionPaymentMethod', paymentMethod);
  }, [paymentMethod]);


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('potionCart'));
    // console.log('storedCart', storedCart, typeof storedCart);
    if (storedCart) {
      setCart(storedCart);
      return;
    }
    // set cart to have all keys to 0
    if (Object.keys(inventory).length > 0) {
      const newCart = {};
      Object.keys(inventory.items).forEach((key) => {
        newCart[key] = 0;
      });
      setCart(newCart);
    }
  }, [inventory]);

  if (Object.keys(inventory).length === 0) {
    return null;
  }

  if (Object.keys(cart).length === 0) {
    return null;
  }

  if (!token) {
    return (
      <BrowserRouter basename={basename}>
        <Routes>
          <Route
            path="/*"
            element={<Login
              potions={inventory.items}
              cart={cart}
              token={token}
              sheetId={sheetId}
              sheetName={sheetName}
              setCart={setCart}
              setToken={setToken}
              setSheetId={setSheetId}
              setSheetName={setSheetName}
            />}
          />
        </Routes>
      </BrowserRouter>
    );
  }

  const appendSheetData = () => {
    // const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}:append?valueInputOption=USER_ENTERED`;

    if (!window.confirm('Are you sure you want to checkout?')) {
      return;
    }
    // sum up all quantities in cart
    let total = 0;
    Object.keys(cart).forEach((key) => {
      total += cart[key];
    });

    if (total === 0) {
      window.alert('Cart is empty!');
      return;
    }

    // const body = {
    //   values: [
    //     ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5', 'Paypal'], // Data to append
    //   ],
    // };
    // fetch(API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body),
    // })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok ' + response.statusText);
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       console.log('Append response:', data);
    //     })
    //     .catch((error) => {
    //       console.error('Error appending data:', error);
    //     });
  };

  return (
    <div
      className="appContainer"
    >
      <BrowserRouter basename={basename}>
        <div className="pageContainer">
          <Header />
          <Routes>
            <Route
              path='/'
              element={
                <Store
                  potions={inventory.items}
                  cart={cart}
                  paymentMethod={paymentMethod}
                  setCart={setCart}
                  setPaymentMethod={setPaymentMethod}
                  appendSheetData={appendSheetData}
                />
              }
            />
            <Route
              path='/settings'
              element={
                <Login
                  potions={inventory.items}
                  cart={cart}
                  token={token}
                  sheetId={sheetId}
                  sheetName={sheetName}
                  setCart={setCart}
                  setToken={setToken}
                  setSheetId={setSheetId}
                  setSheetName={setSheetName}
                />}
            />
            <Route path='/test' element={<div>Test</div>} />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
};

export default App;
