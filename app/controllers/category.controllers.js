const Category = require("../models/category.model.js");

// GET /categories - ສະແດງທຸກປະເພດ, ຫມວດຫມູ່
exports.findAll = (req, res) => {  
  Category.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    else
      res.send(data);
  });
};

// POST /categories - ສ້າງໃໝ່
exports.create = (req, res) => {
  // ກວດສອບ required field
  if (!req.body.cat_name) {
    res.status(400).send({
      message: "Category name cannot be empty!"
    });
    return;
  }

  const category = new Category({
    cat_name: req.body.cat_name,
    is_deleted: false
  });

  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category."
      });
    else
      res.send(data);
  });
};

// PUT /categories/:id - ອັບເດດ
exports.update = (req, res) => {
  // ກວດສອບ required field
  if (!req.body.cat_name) {
    res.status(400).send({
      message: "Category name cannot be empty!"
    });
    return;
  }

  const category = new Category({
    cat_name: req.body.cat_name,
    is_deleted: req.body.is_deleted || false
  });

  Category.updateById(req.params.id, category, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found category with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating category with id " + req.params.id
        });
      }
    } else
      res.send(data);
  });
};

// DELETE /categories/:id - ລົບ
exports.delete = (req, res) => {
  Category.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found category with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete category with id " + req.params.id
        });
      }
    } else
      res.send({ message: "Category was deleted successfully!" });
  });
};

module.exports = exports;