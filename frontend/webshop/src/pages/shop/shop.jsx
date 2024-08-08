import React, { useContext } from 'react';
import { Product } from './product';
import { useEffect, useState } from 'react'
import { initializeProducts,  getProducts,   initializeAllProducts } from '../../services/apiService';
import './shop.css';
import { ShopContext } from "../../context/shop-context";


export const Shop = () => {

  
  const { setCartItems, cartItems, MAX_PRODUCTS_ID, searchName, setSearchName, productList, setProductList, setAllProductList } = useContext(ShopContext);

  
  const [pageNumber, setPageNumber] = useState(1);
  
  const [localSearchName, setLocalSearchName] = useState('');



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let localProductList = await initializeProducts();
        setProductList(localProductList); // Update state with the products array
        let cart ={};
        for (let i = 0; i < MAX_PRODUCTS_ID; i++) {
            cart[i] = 0;
        }
        if (cartItems === undefined) {
          setCartItems(cart);
        }

        setAllProductList(await initializeAllProducts());


      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts(pageNumber, searchName);
        console.log('result:', result);
        setProductList(result);
        console.log('searchName:', searchName);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

  }, [pageNumber, searchName]);


  const increasePageNumber = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
    
  };
  const decreasePageNumber = () => {
    if (pageNumber > 1) {
      setPageNumber(prevPageNumber => prevPageNumber - 1);
    }
  }

  const handleSearch = () => {
    setPageNumber(1); // Reset to first page on new search
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

                {productList.map((product => 
                    <Product key={product.id} data = {product}/>
            ))}
            </div>

            <div className="pageNumber">
              <button onClick={() => decreasePageNumber()}> &lt; </button>
              <input value = {pageNumber} onChange={(e) => setPageNumber(Number(e.target.value))} />
              <button onClick={() => increasePageNumber()}> &gt; </button>
            </div>

     

        </div>
        
        

    )
}