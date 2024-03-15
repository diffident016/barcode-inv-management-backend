import Order from "../models/order.js";
import Product from "../models/product.js";
import Sales from "../models/sales.js";

import { socketIO } from "../server.js";

const addOrder = async (req, res) => {
  const addOrderDetails = new Order({
    storeID: req.body.storeID,
    customerID: req.body.customerID,
    productID: req.body.productID,
    customer: req.body.customer,
    product: req.body.product,
    quantity: req.body.quantity,
    orderDate: req.body.orderDate,
    orderStatus: req.body.orderStatus,
    orderAmount: req.body.orderAmount,
  });

  const order = await Order.findOne({
    storeID: req.body.storeID,
    customerID: req.body.customerID,
    productID: req.body.productID,
    orderStatus: req.body.orderStatus,
  });

  if (!order) {
    addOrderDetails
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(402).send(err);
      });
  } else {
    Order.findByIdAndUpdate(
      { _id: order._id },
      {
        quantity: order.quantity + req.body.quantity,
        orderAmount: order.orderAmount + req.body.orderAmount,
      },
      { new: true }
    )
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(402).send(err);
      });
  }
};

const updateQuantity = async (req, res) => {
  const quantity = req.body.quantity;
  const orderID = req.body.orderID;
  const orderAmount = req.body.orderAmount;
  const productID = req.body.productID;

  const product = Product.findById({
    _id: productID,
  });

  if (!product) {
    return res.status(402).send(err);
  }

  const available = product.stock - product.sold;

  if (quantity > available) {
    return res
      .status(402)
      .send(`There are only ${available} item(s) in the stock.`);
  }

  Order.findByIdAndUpdate(
    {
      _id: orderID,
    },
    {
      quantity: quantity,
      orderAmount: orderAmount,
    },
    { new: true }
  )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(402).send(err);
    });
};

const proceedOrder = async (order) => {
  const productID = order.productID;
  const quantity = order.quantity;

  const product = await Product.findById({
    _id: productID,
  });

  const valid = product.stock - product.sold >= quantity;

  if (!valid) {
    return null;
  }

  const addOrderDetails = new Order({
    storeID: order.storeID,
    productID: order.productID,
    product: order.product,
    quantity: order.quantity,
    orderDate: order.orderDate,
    orderStatus: order.orderStatus,
    orderAmount: order.orderAmount,
  });

  const newSales = new Sales({
    storeID: order.storeID,
    productID: order.productID,
    product: order.product,
    quantity: quantity,
    dateRecord: new Date(),
    totalSales: order.product.price * quantity,
    totalCost: order.product.cost * quantity,
    totalRevenue: (order.product.price - order.product.cost) * quantity,
  });

  await addOrderDetails.save();

  await Product.findByIdAndUpdate(
    {
      _id: order.productID,
    },
    {
      sold: order.product.sold + quantity,
    }
  );

  return newSales.save();
};

const checkoutOrder = async (req, res) => {
  const orders = req.body;

  Promise.all(orders.map(async (order) => await proceedOrder(order)))
    .then((_) =>
      res.status(200).send({
        status: "success",
        message: "Order successful.",
      })
    )
    .catch((err) =>
      res.status(402).send({
        status: "fail",
        message: "Something went wrong, try again later.",
      })
    );
};

const cancelOrder = async (req, res) => {
  const orderID = req.body.orderID;
  const orderStatus = req.body.orderStatus;

  Order.findByIdAndUpdate(
    {
      _id: orderID,
    },
    {
      orderStatus: orderStatus,
      orderDate: new Date(),
    }
  )
    .then((result) => {
      socketIO.emit("update", true);
      res.status(200).send({
        status: "success",
        message: "Cancel successful.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(402).send({
        status: "fail",
        message: "Something went wrong, try again later.",
      });
    });
};

const completeOrder = async (req, res) => {
  const { storeID, customer, quantity } = req.body;

  try {
    const productID = req.body.product._id;
    const customerID = customer._id;

    const product = await Product.findById({
      _id: productID,
    });

    if (!product) {
      return res.status(402).send({
        status: "fail",
        message: "This item was removed from the store.",
      });
    }

    const valid = product.stock - product.sold >= quantity;

    if (!valid) {
      return res.status(402).send({
        status: "fail",
        message: "The item was out of stock or insufficient of stock.",
      });
    }

    const newSales = new Sales({
      storeID: storeID,
      customerID: customerID,
      productID: productID,
      customer: customer,
      product: product,
      quantity: quantity,
      dateRecord: new Date(),
      totalSales: product.price * quantity,
      totalCost: product.cost * quantity,
      totalRevenue: (product.price - product.cost) * quantity,
    });

    await Order.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      {
        orderStatus: 2,
        orderDate: new Date(),
      }
    );

    await Product.findByIdAndUpdate(
      {
        _id: productID,
      },
      {
        sold: product.sold + quantity,
      }
    );

    await newSales.save();

    socketIO.emit("update", true);

    res.status(200).send({
      status: "success",
      message: "Order approval successful.",
    });
  } catch (err) {
    console.log(err);
    res.status(402).send(err);
  }
};

const removeOrder = async (req, res) => {
  Order.findByIdAndDelete({
    _id: req.params.orderID,
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(402).send(err);
    });
};

const getMyCart = async (req, res) => {
  const findAllCart = await Order.find({
    customerID: req.params.customerID,
    orderStatus: 0,
  }).sort({ _id: -1 });
  res.json(findAllCart);
};

const getMyOrder = async (req, res) => {
  const findAllOrder = await Order.find({
    customerID: req.params.customerID,
    orderStatus: { $ne: 0 },
  }).sort({ _id: -1 });
  res.json(findAllOrder);
};

const getAllOrder = async (req, res) => {
  const getAllOrder = await Order.find({
    storeID: req.params.storeID,
    orderStatus: { $ne: 0 },
  }).sort({ _id: -1 });
  res.json(getAllOrder);
};

export {
  addOrder,
  getMyCart,
  updateQuantity,
  removeOrder,
  checkoutOrder,
  getMyOrder,
  cancelOrder,
  getAllOrder,
  completeOrder,
};
