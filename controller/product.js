import Product from "../models/product.js";
import Purchase from "../models/purchase.js";
import Sales from "../models/sales.js";

// Add Post
const addProduct = (req, res) => {
    console.log("req: ", req.body);
    const addProduct = new Product({
        userID: req.body.userID,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        cost: req.body.cost,
        available: req.body.available,
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

// Get All Products
const getAllProducts = async (req, res) => {
    const findAllProducts = await Product.find({
        userID: req.params.userId,
    }).sort({ _id: -1 }); // -1 for descending;
    res.json(findAllProducts);
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
    const deleteProduct = await Product.findByIdAndDelete(
        { _id: req.params.id }
    );
    const deletePurchaseProduct = await Purchase.findByIdAndDelete(
        { ProductID: req.params.id }
    );

    const deleteSaleProduct = await Sales.findByIdAndDelete(
        { ProductID: req.params.id }
    );
    res.json({ deleteProduct, deletePurchaseProduct, deleteSaleProduct });
};

// Update Selected Product
const updateSelectedProduct = async (req, res) => {
    try {
        const updatedResult = await Product.findByIdAndUpdate(
            { _id: req.body.productID },
            {
                name: req.body.name,
                manufacturer: req.body.manufacturer,
                description: req.body.description,
            },
            { new: true }
        );
        console.log(updatedResult);
        res.json(updatedResult);
    } catch (error) {
        console.log(error);
        res.status(402).send("Error");
    }
};

// Search Products
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
