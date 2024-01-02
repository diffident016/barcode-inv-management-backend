import Customer from "../models/customers.js";
import bcrypt from 'bcryptjs'
import { socketIO } from "../server.js";

const getCustomer = async (req, res) => {

    try {
        const customer = await Customer.findOne({
            email: req.body.email
        });

        if (!customer) {
            return res.status(201).json('Account not found.');
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password, customer.password);

        if (!isPasswordValid) {
            return res.status(401).json('Invalid username or password.');
        }

        res.json(customer);

    } catch (e) {
        console.log(e)
        return res.status(201).json('Account not found.');
    }
};

const addCustomer = async (req, res) => {

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    let addCustomer = new Customer({
        name: req.body.name,
        email: req.body.email,
        userType: req.body.userType,
        password: hashedPassword,
        imageUrl: req.body.imageUrl,
    });

    addCustomer
        .save()
        .then((result) => {
            socketIO.emit('update', true);
            res.status(200).send(result);
        })
        .catch((err) => console.log("Signup: ", err));
};

const getAllCustomer = async (req, res) => {
    const findAllCustomers = await Customer.find().sort({ _id: -1 });
    res.json(findAllCustomers);
};

export { addCustomer, getCustomer, getAllCustomer }