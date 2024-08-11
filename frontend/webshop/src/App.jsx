import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart';
import { Settings } from './pages/settings/settings';
import { Checkout } from './pages/checkout/checkout';
import {LoginSignup} from './pages/loginSignup/loginSignup';
import { ShopContextProvider } from './context/shop-context';
import './App.css';

const App = () => (
  <div className="App">
    <ShopContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/loginSignup" element={<LoginSignup />} />
        </Routes>
      </Router>
    </ShopContextProvider>
  </div>
);

export default App;
