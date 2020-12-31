const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const stripe = require("stripe")(
  "sk_test_51I0lA3D0OfQEoW0joiGxzRz3TrTZZc0FZm9DOrCL7U5IEKQ9DTOsfQrfxxuh59OhD3q639rFlQ3UHR8ZDiJafe3i00XwSIU1Ej"
);

exports.createProduct = async (req, res, next) => {
  try {
    const {
      shippingAddress,
      orderItems,
      paymentMethod,
      taxPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingAddress,
      user: req.user.id,
      orderItems,
      paymentMethod,
      taxPrice,
      totalPrice,
    });
    if (order.length === 0) {
      return res.status(400).json({ msg: "No order defined" });
    }

    res.status(200).json({
      shippingAddress: order.shippingAddress,
      user: order.user,
      orderItems: order.orderItems,
      paymentMethod: order.paymentMethod,
      taxPrice: order.taxPrice,
      totalPrice: order.totalPrice,
      id: order._id,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user");
    if (!order) {
      return res.status(404).json({ msg: "No order with this ID" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.payProduct = async (req, res) => {
  try {
    const { token } = req.body;
    const id = req.params.id;
    const order = await Order.findById(id).populate("user");
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // const idempotency_key = uuid();

    const charge = await stripe.charges.create({
      amount: Math.round(order.totalPrice * 100),
      currency: "usd",
      customer: customer.id,
      receipt_email: order.user.email,
      description: `Purchased the ${order._id}`,
      shipping: {
        name: token.card.name,
        address: {
          line1: order.shippingAddress.address,
          city: order.shippingAddress.city,
          country: order.shippingAddress.country,
          postal_code: order.shippingAddress.postalCode,
        },
      },
    });

    if (!order) {
      return res.status(404).json({ msg: "No order found with this id" });
    }

    // (product.countInStock =
    //   product.countInStock - order.orderItems.map((anItem) => anItem.qty)),
    (order.paidAt = Date.now()),
      (order.isPaid = true),
      (order.paymentResult = charge);

    const newOrder = await order.save();
    res.status(200).json(newOrder);
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }
};

exports.payProductPayPal = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentResult } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ msg: "No orders found" });
    }

    (order.isPaid = true),
      (order.paidAt = Date.now()),
      (order.paymentResult = {
        status: paymentResult.status,
        update_time: paymentResult.update_time,
        id: paymentResult.id,
        email_address: paymentResult.payer.email_address,
      });

    const newOrder = await order.save();
    res.status(200).json(newOrder);
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.getAnOrder = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  if (!orders) {
    res.status(404).json({ msg: "You have not done any order" });
  }

  res.status(200).json(orders);
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    if (!orders) {
      res.status(404).json({ msg: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.deliverOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ msg: "No orders found" });
    }

    order.deliveredAt = Date.now();
    order.isDelivered = true;

    const newOrder = await order.save();
    res.status(200).json(newOrder);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
