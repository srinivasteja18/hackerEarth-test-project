export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart"))
      cart = JSON.parse(localStorage.getItem("cart"));
    cart.push({ ...item, item, count: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};
export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart"))
      return JSON.parse(localStorage.getItem("cart"));
  }
};
export const removeItemFromCart = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === productId) {
        cart.splice(i, 1);
      }
    }
    // cart.map((product, i) => {});
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = (next) => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
      let cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  }
};
