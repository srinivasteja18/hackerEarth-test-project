// import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  return fetch(`/api/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  });
  // .then((res) => {
  //   console.log(res);
  //   return res.json();
  // })
  // .catch((err) => console.log("ERROR", err));
};
