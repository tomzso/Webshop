import React, { useContext, useEffect, useState } from 'react';
import { Product } from './product';
import { initializeProducts, getProducts, initializeAllProducts } from '../../services/apiService';
import './shop.css';
import { ShopContext } from "../../context/shop-context";

export const Shop = () => {
  const {
    pageNumber,
    setPageNumber,
    setCartItems,
    cartItems,
    MAX_PRODUCTS_ID,
    searchName,
    setSearchName,
    productList,
    setProductList,
    setAllProductList
  } = useContext(ShopContext);

  
  const [localSearchName, setLocalSearchName] = useState('');

  useEffect(() => {
    const initialize = async () => {
      try {
        const [initialProducts, allProducts] = await Promise.all([
          initializeProducts(pageNumber, localSearchName),
          initializeAllProducts()
        ]);

        setProductList(initialProducts);
        setAllProductList(allProducts);

        if (!cartItems) {
          setCartItems(Array(MAX_PRODUCTS_ID).fill(0));
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initialize();
  }, [cartItems, MAX_PRODUCTS_ID, setCartItems, setProductList, setAllProductList]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts(pageNumber, searchName);
        setProductList(result);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [pageNumber, searchName, setProductList]);

  const handleSearch = () => {
    setPageNumber(1);
    setSearchName(localSearchName);
  };

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>My Shop</h1>
      </div>

      <div className="search">
        <input
          type="text"
          value={localSearchName}
          onChange={(e) => setLocalSearchName(e.target.value)}
          placeholder="Search products"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="products">
        {productList.map(product => (
          <Product key={product.id} data={product} />
        ))}
      </div>

      <div className="pageNumber">
        <button onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}>&lt;</button>
        <input
          type="number"
          value={pageNumber}
          min="1"
          onChange={(e) => setPageNumber(Number(e.target.value))}
        />
        <button onClick={() => setPageNumber(prev => prev + 1)}>&gt;</button>
      </div>
    </div>
  );
};
