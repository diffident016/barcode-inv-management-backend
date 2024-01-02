import User from "../models/users.js";
import { socketIO } from "../server.js";

const getUser = async (req, res) => {
    const user = await User.findOne({
        authId: req.params.authId
    });
    res.json(user);
};

const addUser = async (req, res) => {
    let addUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        authId: req.body.authId,
        userType: req.body.userType,
        phoneNumber: req.body.phoneNumber,
        imageUrl: req.body.imageUrl,
    });

    addUser
        .save()
        .then((result) => {
            socketIO.emit('update', true);
            res.status(200).send(result);
        })
        .catch((err) => console.log("Signup: ", err));
    console.log("request: ", req.body);
};

export { getUser, addUser }