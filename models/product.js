import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        barcode: {
            type: String,
            required: true,
        },
        vendor: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        },
        available: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        photoUrl: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);


const Product = mongoose.model("product", ProductSchema);
export default Product;
