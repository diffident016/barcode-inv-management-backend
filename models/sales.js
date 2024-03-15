import { Schema, model } from "mongoose";

const SalesSchema = new Schema(
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
    dateRecord: {
      type: String,
      required: true,
    },
    totalSales: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    totalRevenue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Sales = model("sales", SalesSchema);
export default Sales;
