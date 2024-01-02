import Sales from "../models/sales.js";

const getAllSales = async (req, res) => {
    const getAllSales = await Sales.find({
        storeID: req.params.storeID
    }).sort({ _id: -1 });
    res.json(getAllSales);
};

export {
    getAllSales
}