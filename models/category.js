import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    category_id: "String",
    category_name: "String",
  },
  { timestamps: true }
);

const Category = model("categories", CategorySchema);
export default Category;
