import React, {useContext} from 'react';
import { ShopContext } from '../../context/shop-context';
import { createOrder} from '../../services/apiService';

export const CartItem = (props) => {
    const {id, name, description, price, stockQuantity, category, imageUrl, orderItems } = props.data;
    const {cartItems, addToCart, removeFromCart, updateCartItemCount} = useContext(ShopContext);


    return (
    <div className="cartItem"> 
    <img src={imageUrl} />
        <div className="description">
            <p>
                <b>{name}</b>
            </p>
            <p>
                {price} €
            </p>
            <div className='countHandler'> 
                <button onClick={() => removeFromCart(id)}> - </button>
                <input value = {cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value),id)} />
                <button onClick={() => addToCart(id)}> + </button>
            </div>

            

        </div>
    </div>
    )
}