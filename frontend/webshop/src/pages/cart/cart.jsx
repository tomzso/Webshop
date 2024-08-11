import React, { useContext } from 'react';
import { ShopContext } from "../../context/shop-context";
import { CartItem } from './cart-item';
import './cart.css';
import { useNavigate } from "react-router-dom";

export const Cart = () => {
    const { cartItems, getTotalCartAmount, allProductList } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();

    // Filter out products that are not in the cart or have zero quantity
    const cartProductList = allProductList.filter(product => cartItems[product.id] > 0);

    return (
        <div className='cart'>
            <h1>Your Cart Items</h1>
            {cartProductList.length > 0 ? (
                <>
                    <div className='cartItems'>
                        {cartProductList.map((product) => (
                            <CartItem data={product} key={product.id} amount={cartItems[product.id]} />
                        ))}
                    </div>
                    <div className='checkout'>
                        <p>Subtotal: {totalAmount} €</p>
                        <button onClick={() => navigate("/")}>Continue Shopping</button>
                        <button onClick={() => navigate("/checkout")}>Checkout</button>
                    </div>
                </>
            ) : (
                <h1>Your Cart is Empty</h1>
            )}
        </div>
    );
};
