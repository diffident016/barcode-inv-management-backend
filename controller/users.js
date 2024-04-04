import User from "../models/users.js";
import { socketIO } from "../server.js";

const getUser = async (req, res) => {
  const user = await User.findOne({
    authId: req.params.authId,
  });
  res.json(user);
};

const getAllUsers = async (req, res) => {
  const getAllUsers = await User.find().sort({ _id: -1 });
  res.json(getAllUsers);
};

const addUser = async (req, res) => {
  let addUser = new User({
    name: req.body.name,
    email: req.body.email,
    authId: req.body.authId,
    userType: req.body.userType,
    imageUrl: req.body.imageUrl,
  });

  addUser
    .save()
    .then((result) => {
      socketIO.emit("update", true);
      res.status(200).send(result);
    })
    .catch((err) => console.log("Signup: ", err));
};

export { getUser, addUser, getAllUsers };
