const Product = require("../models/product");

const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "No product Found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "somthing wrong with the image",
      });
    }

    //validating the fields
    const { name, description, category, price, stock } = fields;
    if (!name || !description || !category || !price || !stock) {
      return res.status(400).json({
        error: "Please provide required details",
      });
    }
    let product = new Product(fields);
    //file handeled here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //saving product into DB
    //console.log(product);
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "saving the file into database Failed!",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  return res.json(req.product);
};

exports.updateProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    console.log(err);
    if (err) {
      return res.status(400).json({
        error: "somthing wrong with the image",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);
    //file handeled here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //saving product into DB
    //console.log(product);
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "updating the file into database Failed!",
        });
      }
      res.json(product);
    });
  });
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Deletion failed",
      });
    }
    res.json({
      message: `${deletedProduct} deleted successfully`,
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No Products found",
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("catgeory", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No categories found!!",
      });
    }
    res.json(categories);
  });
};

//middleware to extract photos
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

//middleware to update stock and sold
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((product) => {
    return {
      UpdateOne: {
        filter: { _id: product.id },
        update: { $inc: { stock: -product.count, sold: +product.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Buld operations failed!!",
      });
    }
    next();
  });
};
