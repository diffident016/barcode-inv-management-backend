import Customer from "../models/customers.js";

const getCustomer = async (req, res) => {
    const customer = await Customer.findOne({
        email: req.params.email
    });
    res.json(customer);
};

const addCustomer = async (req, res) => {
    let addCustomer = new Customer({
        name: req.body.name,
        email: req.body.email,
        userType: req.body.userType,
        password: req.body.password,
        imageUrl: req.body.imageUrl,
    });

    addCustomer
        .save()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => console.log("Signup: ", err));
    console.log("request: ", req.body);
};

export { addCustomer, getCustomer }