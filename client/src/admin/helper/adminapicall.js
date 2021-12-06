import { API } from "../../backend";

//Create Category
export const createCatgeory = (userId, token, category) => {
  return fetch(`${API}category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Get a Category

export const getCategory = (categoryId) => {
  return fetch(`${API}category/${categoryId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Get Categories
export const getCategories = () => {
  return fetch(`${API}categories`, {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Update Category
export const updateOneCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Delete category

export const deleteCategory = (CategoryId, userId, token) => {
  return fetch(`${API}category/${CategoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Product API calls
//Create Product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Get all Products
export const getAllProducts = () => {
  return fetch(`/products`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Get A product
export const getProduct = (productId) => {
  return fetch(`${API}products/${productId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Update a Product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Delete a product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}product/${productId}/${userId}`, {
    method: "Delete",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

// Orders

export const getAllOrders = (userId, token) => {
  return fetch(`${API}order/all/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getUserOrders = (userId, token) => {
  return fetch(`${API}user/orders/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
