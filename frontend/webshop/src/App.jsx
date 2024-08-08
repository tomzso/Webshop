import { useEffect, useState } from 'react'

import './App.css'

import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import {Navbar} from './components/navbar';
import {Shop} from './pages/shop/shop';
import {Cart} from './pages/cart/cart';

import { createProduct,getProducts, initializeProducts, products } from './services/apiService';
import { ShopContextProvider } from './context/shop-context';
import LoginSignup from './components/LoginSignup/LoginSignup';
import { Settings } from './components/Settings/settings';
import { Checkout } from './components/checkout/checkout';

//import {products} from './products';

const GET_URL  = 'https://localhost:7267/api/orders'

const POST_URL = 'https://localhost:7267/api/products';

let p =[]

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Main />
        </Router>
      </ShopContextProvider>
    </div>
  );
}

function Main() {
  const location = useLocation();

  const handleCreateProduct = async () => {
    const productData = {
      name: "bbbbbb",
      description: "asd",
      price: 1,
      stockQuantity: 30,
      category: "string",
      imageUrl: "string"
    };

    try {
      const result = await createProduct(productData);
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGetAllProduct = async () => {
    try {
      const result = await getProducts();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  return (
    <>
      {location.pathname !== '/loginsignup' && <Navbar />}
      <Routes>
        <Route path="/LoginSignup" element={<LoginSignup />} />
        <Route path="/" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/checkout" element={<Checkout />} />


      </Routes>
    </>
  );
}

export default App;