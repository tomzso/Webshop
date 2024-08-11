import React, { createContext, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  // Initialize cart as an empty object
  return {};
};

export const ShopContextProvider = (props) => {
  const [productList, setProductList] = useState([]);
  const [allProductList, setAllProductList] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [pageNumber, setPageNumber] = useState(1);

  // User information
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  // Checkout information
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard'); // Default payment method
  const [emailCheckout, setEmailCheckout] = useState('');

  const handleInputChange = (setter) => (e) => setter(e);
  const handleSigninInputChange = (setter) => (e) => setter(e.target.value);

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const itemCount = cartItems[itemId];
      if (itemCount > 0) {
        const itemInfo = allProductList.find((product) => product.id === Number(itemId));
        if (itemInfo) {
          total += itemInfo.price * itemCount;
        }
      }
      return total;
    }, 0);
  };

  const addToCart = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
  };

  const updateCartItemCount = (count, id) => {
    setCartItems((prev) => ({ ...prev, [id]: count }));
  };

  const contextValue = {
    pageNumber, setPageNumber,
    setCartItems,
    productList, setProductList,
    allProductList, setAllProductList,
    searchName, setSearchName,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    name, email, password,
    handleNameChange: handleSigninInputChange(setName),
    handleEmailChange: handleSigninInputChange(setEmail),
    handlePasswordChange: handleSigninInputChange(setPassword),
    shippingAddress, billingAddress,
    handleShippingAddressChange: handleInputChange(setShippingAddress),
    handleBillingAddressChange: handleInputChange(setBillingAddress),
    phoneNumber,
    handlePhoneNumberChange: handleInputChange(setPhoneNumber),
    paymentMethod, handlePaymentMethodChange: handleInputChange(setPaymentMethod),
    emailCheckout, handleEmailCheckoutChange: handleInputChange(setEmailCheckout),
    userName, setUserName, token, setToken, userId, setUserId
  };

  console.log('cartItems', cartItems);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
