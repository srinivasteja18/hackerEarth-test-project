const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No category Found in DB",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  console.log(category);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category not saved in database",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No catgeories found",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.param("name");
  category.save((err, updatedCategory) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Failed to update category",
      });
    }
    res.json(updatedCategory);
  });
  // });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category",
      });
    }
    res.json({
      message: `${category.name} category is succesfully deleted`,
    });
  });
};
