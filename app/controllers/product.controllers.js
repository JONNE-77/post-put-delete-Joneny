
const Product = require("../models/product.model.js");

// GET /products - ສະແດງທຸກສິນຄ້າ
exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else
      res.send(data);
  });
};

// GET /products/:id - ສະແດງສິນຄ້າ ID ໂດຍລະບຸ ID
exports.findOne = (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving product with id " + req.params.id
        });
      }
    } else
      res.send(data);
  });
};

// POST /products - ສ້າງສິນຄ້າໃໝ່
exports.create = (req, res) => {
  // ກວດສອບ required fields
  if (!req.body.name || !req.body.price || !req.body.cat_id) {
    res.status(400).send({
      message: "Product name, price, and category ID are required!"
    });
    return;
  }

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    cat_id: req.body.cat_id
  });

  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product."
      });
    else
      res.send(data);
  });
};

// PUT /products/:id - ອັບເດດສິນຄ້າ
exports.update = (req, res) => {
  // ກວດສອບ required fields
  if (!req.body.name || !req.body.price || !req.body.cat_id) {
    res.status(400).send({
      message: "Product name, price, and category ID are required!"
    });
    return;
  }

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    cat_id: req.body.cat_id
  });

  Product.updateById(req.params.id, product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating product with id " + req.params.id
        });
      }
    } else
      res.send(data);
  });
};

// DELETE /products/:id - ລົບສິນຄ້າ
exports.delete = (req, res) => {
  Product.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete product with id " + req.params.id
        });
      }
    } else
      res.send({ message: "Product was deleted successfully!" });
  });
};

// DELETE /products - ລົບທຸກສິນຄ້າ
exports.deleteAll = (req, res) => {
  Product.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    else
      res.send({ message: "All products were deleted successfully!" });
  });
};

module.exports = exports;