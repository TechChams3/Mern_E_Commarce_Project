import Category from "../Model/CategoryModel.js";
import asyncHandeler from "../Middelwear/async.js";

const createCategory = asyncHandeler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ error: "Name is required" });
    }
    const existCatergory = await Category.findOne({ name });
    if (existCatergory) {
      return res.json({ error: "Already exists" });
    }

    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateCategory = asyncHandeler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    category.name = name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleatecategory = asyncHandeler(async (req, res) => {
  try {
    const remove = await Category.findByIdAndDelete(req.params.categoryId);
    res.json(remove);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const listCategory = asyncHandeler(async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const readCategory = asyncHandeler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export {
  createCategory,
  updateCategory,
  deleatecategory,
  listCategory,
  readCategory,
};
