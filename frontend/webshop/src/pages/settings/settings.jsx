import React, { useState, useContext } from 'react';
import { ShopContext } from "../../context/shop-context";
import './settings.css';

const FormInput = ({ id, type, value, onChange, label }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
    />
  </div>
);

const PaymentMethodRadio = ({ value, checked, onChange, label }) => (
  <label>
    <input
      type="radio"
      name="paymentMethod"
      value={value}
      checked={checked}
      onChange={onChange}
    />
    {label}
  </label>
);

export const Settings = () => {
  const { 
    handleShippingAddressChange, 
    handleBillingAddressChange, 
    handlePhoneNumberChange, 
    handlePaymentMethodChange, 
    shippingAddress, 
    billingAddress, 
    phoneNumber, 
    paymentMethod, 
    emailCheckout,
    handleEmailCheckoutChange 
  } = useContext(ShopContext);

  const [localShippingAddress, setLocalShippingAddress] = useState(shippingAddress);
  const [localBillingAddress, setLocalBillingAddress] = useState(billingAddress);
  const [localEmail, setLocalEmail] = useState(emailCheckout);
  const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber);
  const [localPaymentMethod, setLocalPaymentMethod] = useState(paymentMethod);
  const [dialog, setDialog] = useState({ type: '', message: '' });

  const save = () => {
    handleShippingAddressChange(localShippingAddress);
    handleBillingAddressChange(localBillingAddress);
    handleEmailCheckoutChange(localEmail);
    handlePhoneNumberChange(localPhoneNumber);
    handlePaymentMethodChange(localPaymentMethod);
    setDialog({ type: 'success', message: 'Settings saved successfully' });
    setTimeout(() => setDialog({ type: '', message: '' }), 2500);
  };

  return (
    <div>
      <div className="settings-container">
        <h1>Order settings</h1>
        <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
          <FormInput
            id="shippingAddress"
            type="text"
            value={localShippingAddress}
            onChange={(e) => setLocalShippingAddress(e.target.value)}
            label="Shipping Address"
          />
          <FormInput
            id="billingAddress"
            type="text"
            value={localBillingAddress}
            onChange={(e) => setLocalBillingAddress(e.target.value)}
            label="Billing Address"
          />
          <FormInput
            id="email"
            type="email"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
            label="Email"
          />
          <FormInput
            id="phoneNumber"
            type="tel"
            value={localPhoneNumber}
            onChange={(e) => setLocalPhoneNumber(e.target.value)}
            label="Phone Number"
          />
          <div className="payment-method-group">
            <label className="payment-method-title">Payment Method:</label>
            <PaymentMethodRadio
              value="creditCard"
              checked={localPaymentMethod === 'creditCard'}
              onChange={(e) => setLocalPaymentMethod(e.target.value)}
              label="Credit Card"
            />
            <PaymentMethodRadio
              value="paypal"
              checked={localPaymentMethod === 'paypal'}
              onChange={(e) => setLocalPaymentMethod(e.target.value)}
              label="PayPal"
            />
            <PaymentMethodRadio
              value="cash"
              checked={localPaymentMethod === 'cash'}
              onChange={(e) => setLocalPaymentMethod(e.target.value)}
              label="Cash"
            />
          </div>
        </form>
        <button className="save-button" onClick={save}>Save changes</button>
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
