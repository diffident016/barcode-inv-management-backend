import Purchase from "../models/purchase.js";
import purchaseStock from "./purchaseStock.js";

// Add Purchase Details
const addPurchase = (req, res) => {
    const addPurchaseDetails = new Purchase({
        userID: req.body.userID,
        ProductID: req.body.productID,
        QuantityPurchased: req.body.quantityPurchased,
        PurchaseDate: req.body.purchaseDate,
        TotalPurchaseAmount: req.body.totalPurchaseAmount,
    });

    addPurchaseDetails
        .save()
        .then((result) => {
            purchaseStock(req.body.productID, req.body.quantityPurchased);
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(402).send(err);
        });
};

// Get All Purchase Data
const getPurchaseData = async (req, res) => {
    const findAllPurchaseData = await Purchase.find({ "userID": req.params.userID })
        .sort({ _id: -1 })
        .populate("ProductID"); // -1 for descending order
    res.json(findAllPurchaseData);
};

// Get total purchase amount
const getTotalPurchaseAmount = async (req, res) => {
    let totalPurchaseAmount = 0;
    const purchaseData = await Purchase.find({ "userID": req.params.userID });
    purchaseData.forEach((purchase) => {
        totalPurchaseAmount += purchase.TotalPurchaseAmount;
    });
    res.json({ totalPurchaseAmount });
};

export { addPurchase, getPurchaseData, getTotalPurchaseAmount };
