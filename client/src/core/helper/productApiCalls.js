//Create Product
export const createProduct = (product) => {
  return fetch("/new", {
    method: "POST",
    headers: {
      Accept: "application/json",
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
  return fetch("/products", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Get A product
export const getProduct = (productId) => {
  return fetch(`/${productId}/show`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Update a Product
export const updateProduct = (productId, product) => {
  return fetch(`/${productId}/edit`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Delete a product
export const deleteProduct = (productId) => {
  return fetch(`/delete/${productId}`, {
    method: "Delete",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
