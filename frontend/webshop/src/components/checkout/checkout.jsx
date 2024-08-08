import React, { useState, useContext } from 'react';
import { ShopContext } from "../../context/shop-context";
import {  createOrder, createOrderItem } from '../../services/apiService';

import './checkout.css';

export const Checkout = () => {

    const {   shippingAddress, billingAddress,  phoneNumber, paymentMethod,   emailCheckout, token, cartItems } = useContext(ShopContext);
    // State variables to hold form data
    const [localShippingAddress, setShippingAddress] = useState(shippingAddress);
    const [localBillingAddress, setBillingAddress] = useState(billingAddress);
    const [localEmail, setEmail] = useState(emailCheckout);
    const [localPhoneNumber, setPhoneNumber] = useState(phoneNumber);
    const [localPaymentMethod, setPaymentMethod] = useState(paymentMethod);

    // Handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            localShippingAddress,
            localBillingAddress,
            localEmail,
            localPhoneNumber,
            localPaymentMethod,
        };
        console.log('Form Data Submitted:', formData);

        // Here you can handle the form data, such as sending it to a server
    };

    const pay = async () => {
        
        let order = await createOrder(token,  localShippingAddress, localBillingAddress, localEmail, localPhoneNumber, localPaymentMethod);
        
        if (typeof order.id === 'number'){
            console.log('cartItems:', cartItems);
            for (const productId in cartItems) {
                if (cartItems.hasOwnProperty(productId)) {
                    const quantity = cartItems[productId];
                    if (quantity === 0) continue;
                    await createOrderItem( order.id, quantity, productId );
                }
                console.log('id:', productId, 'quantity:', cartItems[productId]);
            }
        }


    }

    return (
        <div className="container">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                {/* Shipping Address */}
                <div className="form-group">
                    <label htmlFor="shippingAddress">Shipping Address:</label>
                    <textarea
                        id="shippingAddress"
                        name="shippingAddress"
                        rows="4"
                        value={localShippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                    />
                </div>

                {/* Billing Address */}
                <div className="form-group">
                    <label htmlFor="billingAddress">Billing Address:</label>
                    <textarea
                        id="billingAddress"
                        name="billingAddress"
                        rows="4"
                        value={localBillingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        required
                    />
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={localEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Phone Number */}
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={localPhoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>

                {/* Payment Method */}
                <div className="form-group">
                    <label>Payment Method:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="creditCard"
                                checked={localPaymentMethod === 'creditCard'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                required
                            />
                            Credit Card
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="paypal"
                                checked={localPaymentMethod === 'paypal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            PayPal
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="bankTransfer"
                                checked={localPaymentMethod === 'bankTransfer'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Bank Transfer
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="form-group">
                    <button onClick={pay}>Pay </button>
                </div>
            </form>
        </div>
    );
};
