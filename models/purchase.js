import { Schema, model } from "mongoose";

const PurchaseSchema = new Schema(
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
        QuantityPurchased: {
            type: Number,
            required: true,
        },
        PurchaseDate: {
            type: String,
            required: true,
        },
        TotalPurchaseAmount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Purchase = model("purchase", PurchaseSchema);
export default Purchase;
