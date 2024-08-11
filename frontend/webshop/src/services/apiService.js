export let products = [];
export let allProducts = [];

export let userName = '';
export let userId = '';
export let token = '';

const BASE_URL = 'https://localhost:7267/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const contentType = response.headers.get('Content-Type');
    const errorBody = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();
    throw new Error(errorBody);
  }
  return response.json();
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getProducts = async (pageNumber = 1, searchName = '') => {
  try {
    const url = new URL(`${BASE_URL}/products`);
    url.searchParams.append('Page', pageNumber);
    if (searchName) url.searchParams.append('Name', searchName);
    console.log('URL:', url);
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const url = new URL(`${BASE_URL}/products`);
    url.searchParams.append('PageSize', 100000);
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error('Error getting all products:', error);
    throw error;
  }
};

export const initializeProducts = async (pageNumber, localSearchName) => {
  try {
    products = await getProducts(pageNumber, localSearchName);
    return products;
  } catch (error) {
    console.error('Error initializing products array:', error);
  }
};

export const initializeAllProducts = async () => {
  try {
    allProducts = await getAllProducts();
    return allProducts;
  } catch (error) {
    console.error('Error initializing all products array:', error);
  }
};

const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

export const createOrder = async (token, shippingAddress, billingAddress, email, phoneNumber, paymentMethod) => {
  if (!email.includes('@')) {
    return { success: false, message: 'Invalidd email address.' };
  }
  if (!token) {
    return { success: false, message: 'Authorization token is required.' };
  }
  if (!shippingAddress) {
    return { success: false, message: 'Shipping address is required.' };
  }

  const orderData = {
    orderDate: getCurrentDate(),
    status: 'pending',
    totalAmount: 0,
    shippingAddress,
    billingAddress,
    email,
    phoneNumber,
    paymentMethod,
  };

  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    return { success: true, message: 'Order created.', data: await handleResponse(response) };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, message: 'Error creating order. Make sure email is correct' };
  }
};

export const deleteOrder = async (token, orderId) => {
  if (!token || !orderId) {
    console.error('Authorization token and orderId are required.');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      console.log('Order deleted successfully');
    } else {
      console.error('Failed to delete the order:', await response.text());
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const createOrderItem = async (token, orderId, quantity, productId) => {
  if (!token) {
    console.error('Authorization token is required.');
    return { success: false, message: 'Authorization token is required.' };
  }

  try {
    const response = await fetch(`${BASE_URL}/orderitem/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity, productId }),
    });
    return { success: true, data: await handleResponse(response) };
  } catch (error) {
    console.error('Error creating order item:', error);
    return { success: false, message: 'Error creating order item.' };
  }
};

export const login = async (loginData) => {
  try {
    const response = await fetch(`${BASE_URL}/account/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });
    const data = await handleResponse(response);
    userName = data.userName;
    userId = data.userId;
    token = data.token;
    return { success: true, message: 'Login successful.', data };
  } catch (error) {
    console.error('Login failed:', error);
    return { success: false, message: error.message };
  }
};

export const register = async (registerData) => {
  if (!registerData.email.includes('@')) {
    return { success: false, message: 'Invalid email address.' };
  }
  if (registerData.password.length < 1) {
    return { success: false, message: 'Password needed' };
  }
  if (registerData.userName.length < 1) {
    return { success: false, message: 'Username needed' };
  }


  try {
    const response = await fetch(`${BASE_URL}/account/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    });
    await handleResponse(response);
    return { success: true, message: 'Registration completed successfully.' };
  } catch (error) {
    console.error('Registration failed:', error);
    return { success: false, message: error.message };
  }
};
