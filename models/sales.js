import { Schema, model } from "mongoose";

const SaleSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        ProductID: {
            type: Schema.Types.ObjectId,
            ref: "product",
            required: true,
        },
        StoreID: {
            type: Schema.Types.ObjectId,
            ref: "store",
            required: true,
        },
        StockSold: {
            type: Number,
            required: true,
        },
        SaleDate: {
            type: String,
            required: true,
        },
        TotalSaleAmount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Sales = model("sales", SaleSchema);
export default Sales;
