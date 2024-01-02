import Product from "../models/product.js";

const addProduct = (req, res) => {
    const addProduct = new Product({
        userID: req.body.userID,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        cost: req.body.cost,
        vendor: req.body.vendor,
        stock: req.body.stock,
        description: req.body.description,
        barcode: req.body.barcode,
        photoUrl: req.body.photoUrl
    });

    addProduct
        .save()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err)
            res.status(402).send(err);
        });
};

const getAllProducts = async (req, res) => {
    const findAllProducts = await Product.find({
        userID: req.params.storeID,
    }).sort({ _id: -1 });
    res.json(findAllProducts);
};

const deleteSelectedProduct = async (req, res) => {
    const deleteProduct = await Product.findByIdAndDelete(
        { _id: req.params.productID }
    );
    res.json({ deleteProduct });
};

const updateSelectedProduct = async (req, res) => {
    try {
        const updatedResult = await Product.findByIdAndUpdate(
            { _id: req.body._id },
            {
                userID: req.body.userID,
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                cost: req.body.cost,
                vendor: req.body.vendor,
                stock: req.body.stock,
                description: req.body.description,
                barcode: req.body.barcode,
                photoUrl: req.body.photoUrl
            },
            { new: true }
        );
        res.json(updatedResult);
    } catch (error) {
        console.log(error);
        res.status(402).send("Error");
    }
};

const searchProduct = async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const products = await Product.find({
        name: { $regex: searchTerm, $options: "i" },
    });
    res.json(products);
};

export {
    addProduct,
    getAllProducts,
    deleteSelectedProduct,
    updateSelectedProduct,
    searchProduct,
};
