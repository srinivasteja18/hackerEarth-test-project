const stripe = require("stripe")(process.env.SECRETKEY);
const uuid = require("uuid/v4");

exports.makePayment = (req, res) => {
  const { token, products } = req.body;
  let amount = 0;
  products.map((p) => {
    amount = amount + p.price;
  });
  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount,
            currency: "INR",
            customer: customer.id,
            receipt_email: token.email,
            description: "product purchased",
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((response) => {
          return res.status(200).json(response);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log("ERROR", error));
};
