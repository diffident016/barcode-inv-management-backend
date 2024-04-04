import { Schema, model } from "mongoose";
import { ProductSchema } from "./product.js";

const ProductOrder = new Schema({
  product: {
    type: ProductSchema,
    required: true,
  },
  quantity: {
    type: Schema.Types.Number,
    required: true,
  },
  amount: {
    type: Schema.Types.Number,
    required: true,
  },
});

const OrderSchema = new Schema(
  {
    storeID: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    clerkID: {
      type: Schema.Types.ObjectId,
      ref: "customer",
    },
    clerk: {
      type: Schema.Types.Mixed,
    },
    products: {
      type: [ProductOrder],
      required: true,
    },
    totalItems: {
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
    totalAmount: {
      type: Number,
      required: true,
    },
    bill: {
      type: Number,
      required: true,
    },
    change: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = model("orders", OrderSchema);
export default Order;
