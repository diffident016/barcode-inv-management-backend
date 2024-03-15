import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    storeID: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    customerID: {
      type: Schema.Types.ObjectId,
      ref: "customer",
    },
    productID: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    customer: {
      type: Schema.Types.Mixed,
    },
    product: {
      type: Schema.Types.Mixed,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: Number,
      required: true,
    },
    orderAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = model("orders", OrderSchema);
export default Order;
