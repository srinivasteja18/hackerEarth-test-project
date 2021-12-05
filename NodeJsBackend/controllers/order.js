const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found!",
        });
      } else {
        res.order = order;
        next();
      }
    });
};

exports.createOrder = (req, res) => {
  console.log("CREATE ORDER");
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save the order",
      });
    }
    // return res.status(200).json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found!!",
        });
      }
      res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err || !order.length) {
        return res.status(400).json({
          error: "Cannot update Order Status",
        });
      }
      res.json(order);
    }
  );
};

exports.getOrdersByUserId = (req, res) => {
  Order.find({ user: req.profile.id }).exec((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "No Orders Found",
      });
    }
    res.json(order);
  });
};
