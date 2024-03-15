import Category from "../models/category.js";
import { socketIO } from "../server.js";

const addCategory = async (req, res) => {
  let addCategory = new Category({
    category_id: req.body.category_id,
    category_name: req.body.category_name,
  });

  addCategory
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
};

const getAllCategories = async (req, res) => {
  const findAllCategories = await Category.find().sort({ _id: -1 });
  res.json(findAllCategories);
};

const deleteCategory = async (req, res) => {
  const deleteCategory = await Category.findByIdAndDelete({
    _id: req.params.categoryId,
  });
  res.json({ deleteCategory });
};

export { addCategory, getAllCategories, deleteCategory };
