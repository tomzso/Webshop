
export let products = [];
export let allProducts = [];

export let userName = '';
export let userId = '';
export let token = '';

export const createProduct = async (productData) => {
  const url = 'https://localhost:7267/api/products';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getProducts = async (pageNumber = 1, searchName = '') => {
  let url = `https://localhost:7267/api/products?Page=${pageNumber}`;
  
  if (searchName) {
    url += `&Name=${encodeURIComponent(searchName)}`;
  }
  console.log('url:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
}



export const getAllProducts = async () => {
  let url = `https://localhost:7267/api/products?PageSize=100000`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
}


export const initializeProducts = async () => {
  try {
    const fetchedProducts = await getProducts();
    return fetchedProducts;

  } catch (error) {
    console.error('Error initializing products array:', error);
  }
};

export const initializeAllProducts = async () => {
  try {
    const fetchedProducts = await getAllProducts();
    return fetchedProducts;

  } catch (error) {
    console.error('Error initializing products array:', error);
  }
};


const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};





export const createOrder = async (token,  shippingAddress, billingAddress, email, phoneNumber, paymentMethod) => {
  const url = 'https://localhost:7267/api/orders';

  if (!token || token === '') {
    console.error('Error: Authorization token is required');
    return; // Exit the function early if the token is not provided
  }
  if (!shippingAddress || shippingAddress === '') {
    console.error('Error: ShippingAddress is required');
    return; // Exit the function early if the token is not provided
  }
   const orderData = {
    orderDate: getCurrentDate(),
    status: 'pending',
    totalAmount: 0,
    shippingAddress: shippingAddress,
    billingAddress: billingAddress,
    email: email,
    phoneNumber: phoneNumber,
    paymentMethod: paymentMethod,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

      body: JSON.stringify(orderData)
    });
    if (!response.ok) return; // Exit the function early if the response status is not ok

    const data = await response.json();
    console.log('Success:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};


export const createOrderItem = async (orderId, quantity, productId) => {
  const url = 'https://localhost:7267/api/orderitem/' + orderId;
  console.log('url:', url);

  const orderItemData = {
    "quantity": quantity,
    "productId": productId
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

      body: JSON.stringify(orderItemData)
    });
    if (!response.ok) return; // Exit the function early if the response status is not ok

    const data = await response.json();
    console.log('Success:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }

};


export const login = async (loginData) => {
  const url = 'https://localhost:7267/api/account/login';
  

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    if (response.ok) { // Checks if the response status is in the range 200-299
      const data = await response.json();

      return {
        userName: data.userName,
        userId: data.userId,
        token: data.token
      }
    } else {
      console.error('Login failed:', response.statusText);
      return {}; // Return false if login failed
    }
  } catch (error) {
    console.error('Error:', error);
    return {}; // Return false if there was an error during the fetch
  }
};


export const register = async (loginData) => {
  const url = 'https://localhost:7267/api/account/register';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    if (response.ok) { // Checks if the response status is in the range 200-299
      const data = await response.json();
      console.log('Success:', data);
      return true; // Return true if login is successful
    } else {
      console.error('Login failed:', response.statusText);
      return false; // Return false if login failed
    }
  } catch (error) {
    console.error('Error:', error);
    return false; // Return false if there was an error during the fetch
  }
};



