import React, {useContext} from 'react';
import { ShopContext } from "../../context/shop-context";
import {CartItem} from './cart-item';
import './cart.css';

import {useNavigate} from "react-router-dom"

export const Cart = () => {
    const {cartItems, getTotalCartAmount, allProductList} = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    const navigate = useNavigate();

return( 

    <div className='cart'>

        <div>
            <h1>Your Cart Items</h1>

        </div>
        <div className='cartItems'>
            {allProductList.map((product) => {
                if(cartItems[product.id] != 0) {
                    return <CartItem data={product} key={product.id} amount={cartItems[product.id]}/>
                }
            }
            )}
            
        </div>
        {totalAmount >0 ?(
        <div className='checkout'>
            <p> Subtotal: {totalAmount} €</p>
            <button onClick={() => navigate("/")} > Continue shopping</button>
            <button onClick={() => navigate("/checkout")} > Checkout</button>
        </div>

        ) : (
            <h1>Your Cart is Empty</h1>
        )}
    </div>
        )


}