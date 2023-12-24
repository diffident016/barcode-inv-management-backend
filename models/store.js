import { Schema, model } from "mongoose";

const StoreSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Store = model("store", StoreSchema);
export default Store;
