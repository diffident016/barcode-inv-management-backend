import { Schema, model } from 'mongoose';

const CustomerSchema = new Schema({
    name: 'String',
    email: 'String',
    userType: {
        type: Schema.Types.Mixed,
        required: true
    },
    imageUrl: 'String',
    password: 'String'
},
    { timestamps: true }
);

const Customer = model("customers", CustomerSchema);
export default Customer;