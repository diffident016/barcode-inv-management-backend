import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    firstName: 'String',
    lastName: 'String',
    email: 'String',
    authId: {
        type: String,
        required: true
    },
    userType: {
        type: Schema.Types.Mixed,
        required: true
    },
    phoneNumber: 'String',
    imageUrl: 'String',
},
    { timestamps: true }
);

const User = model("users", UserSchema);
export default User;