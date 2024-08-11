import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
export const Product = (props) => {
    const {id, name, description, price, stockQuantity, category, imageUrl, orderItems } = props.data;
    const {addToCart, cartItems} = useContext(ShopContext);
    const cartItemAmount = cartItems[id] || 0;
    
    return (
        <div className="product">
            <img src={imageUrl} />
            <div className="description">
                <p>
                    <b>{name}</b>
                </p>

                <p>
                    {price} €
                </p>

                <p>
                    {description}
                </p>

                <p>
                    {stockQuantity} amount in stock
                </p>

            </div>
            <button className="addToCartBttn" onClick={() =>addToCart(id)}>
                Add to cart {cartItemAmount > 0 && `(${cartItemAmount})`}
                </button>
        </div>
    )
    }   