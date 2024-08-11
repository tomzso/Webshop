import React, { useState, useContext } from 'react';
import { ShopContext } from "../../context/shop-context";
import { createOrder, createOrderItem, deleteOrder } from '../../services/apiService';
import { useNavigate } from "react-router-dom";
import './checkout.css';

export const Checkout = () => {
    const navigate = useNavigate();
    const {
        shippingAddress, billingAddress, phoneNumber, paymentMethod, emailCheckout, token, cartItems, setCartItems, userName, MAX_PRODUCTS_ID
    } = useContext(ShopContext);

    // State variables for form data and dialog
    const [formData, setFormData] = useState({
        shippingAddress, billingAddress, email: emailCheckout, phoneNumber, paymentMethod
    });
    const [dialog, setDialog] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data Submitted:', formData);
    };

    const pay = async () => {
        if (!userName) {
            setDialog({ type: 'failure', message: 'Please login to continue' });
            setTimeout(() => setDialog({ type: '', message: '' }), 2500);
            return;
        }
        console.log('Form Data email:', formData.email);

        if(formData.shippingAddress && formData.shippingAddress.length < 3){
            setDialog({ type: 'failure', message: 'Shipping address is too short' });
            setTimeout(() => setDialog({ type: '', message: '' }), 2500);
            return;
        }
        
        if(formData.billingAddress && formData.billingAddress.length < 3){
            setDialog({ type: 'failure', message: 'Billing address is too short' });
            setTimeout(() => setDialog({ type: '', message: '' }), 2500);
            return;
        }

        const response = await createOrder(token, formData.shippingAddress, formData.billingAddress, formData.email, formData.phoneNumber, formData.paymentMethod);

        if (!response.success) {
            setDialog({ type: 'failure', message: response.message });
            setTimeout(() => setDialog({ type: '', message: '' }), 2500);
            return;
        }

        const order = response.data;
        if (typeof order.id === 'number') {
            for (const productId in cartItems) {
                const quantity = cartItems[productId];
                if (quantity > 0) {
                    const orderItemResponse = await createOrderItem(token, order.id, quantity, productId);
                    if (!orderItemResponse.success) {
                        setDialog({ type: 'failure', message: 'Order failed, one of the items is out of stock' });
                        setTimeout(() => setDialog({ type: '', message: '' }), 2500);
                        await deleteOrder(token, order.id);
                        return;
                    }
                }
            }
        }

        let cart ={};
        for (let i = 0; i < MAX_PRODUCTS_ID; i++) {
            cart[i] = 0;
        }
        setCartItems(cart);
        
        setDialog({ type: 'success', message: 'Order placed successfully!' });
        setTimeout(() => {
            navigate("/");
            setDialog({ type: '', message: '' });
        }, 2500);
    };

    return (
        <div>
            <div className="container">
                <h1>Checkout</h1>
                <form onSubmit={handleSubmit}>
                    {/* Shipping Address */}
                    <div className="form-group">
                        <label htmlFor="shippingAddress">Shipping Address:</label>
                        <textarea
                            id="shippingAddress"
                            name="shippingAddress"
                            rows="3"
                            value={formData.shippingAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Billing Address */}
                    <div className="form-group">
                        <label htmlFor="billingAddress">Billing Address:</label>
                        <textarea
                            id="billingAddress"
                            name="billingAddress"
                            rows="3"
                            value={formData.billingAddress}
                            onChange={handleChange}
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
                            value={formData.email}
                            onChange={handleChange}
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
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Payment Method */}
                    <div className="payment-method-group">
                        <label>Payment Method:</label>
                        <div>
                            {['creditCard', 'paypal', 'cash'].map(method => (
                                <label key={method}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method}
                                        checked={formData.paymentMethod === method}
                                        onChange={handleChange}
                                    />
                                    {method.charAt(0).toUpperCase() + method.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                        <button type="button" onClick={pay}>Pay</button>
                    </div>
                </form>
            </div>

            <div>
                {dialog.message && (
                    <div className={`${dialog.type}Dialog`}>
                        {dialog.message}
                    </div>
                )}
            </div>
        </div>
    );
};
