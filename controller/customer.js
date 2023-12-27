import Customer from "../models/customers.js";
import bcrypt from 'bcryptjs'

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

    const hashedPassword = bcrypt.hashSync(req.body.password, '@diffident016')

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
            res.status(200).send(result);
        })
        .catch((err) => console.log("Signup: ", err));
};

export { addCustomer, getCustomer }