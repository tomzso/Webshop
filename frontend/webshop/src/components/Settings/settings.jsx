import React, { useState, useContext } from 'react';
import { ShopContext } from "../../context/shop-context";
import './settings.css';

export const Settings = () => {
  const { handleShippingAddressChange, handleBillingAddressChange,  handlePhoneNumberChange, 
    handlePaymentMethodChange, shippingAddress, billingAddress,  phoneNumber, paymentMethod,   emailCheckout,
    handleEmailCheckoutChange } = useContext(ShopContext);

  const [localShippingAddress, setLocalShippingAddress] = useState(shippingAddress);
  const [localBillingAddress, setLocalBillingAddress] = useState(billingAddress);
  const [localEmail, setLocalEmail] = useState(emailCheckout);
  const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber);
  const [localPaymentMethod, setLocalPaymentMethod] = useState(paymentMethod);

  const save = () => {
    handleShippingAddressChange(localShippingAddress);
    handleBillingAddressChange(localBillingAddress);
    handleEmailCheckoutChange(localEmail);
    handlePhoneNumberChange(localPhoneNumber);
    handlePaymentMethodChange(localPaymentMethod);
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="shippingAddress">Shipping Address</label>
          <input
            type="text"
            id="shippingAddress"
            value={localShippingAddress}
            onChange={(e) => setLocalShippingAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="billingAddress">Billing Address</label>
          <input
            type="text"
            id="billingAddress"
            value={localBillingAddress}
            onChange={(e) => setLocalBillingAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            value={localPhoneNumber}
            onChange={(e) => setLocalPhoneNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Payment Method:</label>
          <div>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={localPaymentMethod === 'creditCard'}
                onChange={(e) => setLocalPaymentMethod(e.target.value)}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={localPaymentMethod === 'paypal'}
                onChange={(e) => setLocalPaymentMethod(e.target.value)}
              />
              PayPal
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="bankTransfer"
                checked={localPaymentMethod === 'bankTransfer'}
                onChange={(e) => setLocalPaymentMethod(e.target.value)}
              />
              Bank Transfer
            </label>
          </div>
        </div>

      </form>
      <button className="save-button" onClick={save}>Save changes</button>
    </div>
  );
};
