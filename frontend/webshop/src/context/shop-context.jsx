import React, {createContext, useState} from "react";
// import { allProducts, products} from '../services/apiService';

export const ShopContext = createContext(null);

const getDefaultCart =() => {
    let cart;
    return cart;
}


export const ShopContextProvider = (props) => {
    const [productList, setProductList] = useState([]);
    const [allProductList, setAllProductList] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [MAX_PRODUCTS_ID, SET_MAX_PRODUCTS_ID] = useState(1000);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [billingAddress, setBillingAddress] = useState("");

    // Additional user information
    const [phoneNumber, setPhoneNumber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState('creditCard'); // Default payment method
    const [emailCheckout, setEmailCheckout] = useState("");
  
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleShippingAddressChange = (e) => setShippingAddress(e);
    const handleBillingAddressChange = (e) => setBillingAddress(e);
    const handlePhoneNumberChange = (e) => setPhoneNumber(e);
    const handlePaymentMethodChange = (e) => setPaymentMethod(e);
    const handleEmailCheckoutChange = (e) => setEmailCheckout(e);


    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');



    const [cartItems, setCartItems] = useState(getDefaultCart());


    const getTotalCartAmount = () => {
        let total = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allProductList.find((product) => product.id == item);
                console.log('itemInfo:', itemInfo);
                total += itemInfo.price * cartItems[item];
            }
        }
        return total;
    }

    const addToCart = (id) => {
        setCartItems((prev) => ({...prev, [id]: prev[id] + 1}));
        
    }
    const removeFromCart = (id) => {
        setCartItems((prev) => ({...prev, [id]: prev[id] - 1}));
    }


    const updateCartItemCount = (count, id ) => {
        setCartItems((prev) => ({...prev, [id]: count}));
    }


    const contextValue = {
        productList, setProductList,
        allProductList, setAllProductList,
        searchName, setSearchName,
        MAX_PRODUCTS_ID,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        updateCartItemCount,
        getTotalCartAmount,
        phoneNumber,
        handlePhoneNumberChange,
        paymentMethod,
        handlePaymentMethodChange,
        emailCheckout,
        handleEmailCheckoutChange,
        name, email, password, handleNameChange, handleEmailChange, handlePasswordChange, shippingAddress, billingAddress, handleShippingAddressChange, handleBillingAddressChange,
        userName, setUserName, token, setToken, userId, setUserId
    };




    console.log('cartItems', cartItems);
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}