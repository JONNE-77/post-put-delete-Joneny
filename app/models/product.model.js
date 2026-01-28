const sql = require("./db");

// Product Constructor - ສ້າງ product object
const Product = function (product) {
  this.name = product.name;        // ຊື່ສິນຄ້າ
  this.price = product.price;      // ລາຄາ
  this.cat_id = product.cat_id;    // ໂອວະລາຍ ID
};

// ສະແດງສິນຄ້າທັງໝົດ
Product.getAll = (callback) => {
  sql.query(
    "SELECT * FROM products",
    callback  
  );
};

// ສ້າງສິນຄ້າໃໝ່
Product.create = (newProduct, callback) => {
  sql.query(
    "INSERT INTO products (name, price, cat_id) VALUES (?, ?, ?)",
    [newProduct.name, newProduct.price, newProduct.cat_id],  // ແທນ ? ດ້ວຍຄ່າ
    callback
  );
};

// ຊອກຫາສິນຄ້າ ID ໂດຍລະບຸ ID
Product.findById = (id, callback) => {
  sql.query(
    "SELECT * FROM products WHERE id = ?",
    id,  // SQL injection ປ້ອງກັນ
    callback
  );
};

// ອັບເດດສິນຄ້າ
Product.updateById = (id, product, callback) => {
  sql.query(
    "UPDATE products SET name = ?, price = ?, cat_id = ? WHERE id = ?",
    [product.name, product.price, product.cat_id, id],
    (err, res) => {
      if (err) {
        callback(err, null);
        return;
      }

      // ກວດສອບວ່າມີສິນຄ້າ ID ຖືກ update ຫຼືບໍ່
      if (res.affectedRows == 0) {
        callback({ kind: "not_found" }, null);
        return;
      }

      callback(null, { id: id, ...product });
    }
  );
};

// ລົບສິນຄ້າ ID ໂດຍລະບຸ ID
Product.remove = (id, callback) => {
  sql.query(
    "DELETE FROM products WHERE id = ?",
    id,
    (err, res) => {
      if (err) {
        callback(err, null);
        return;
      }

      // ກວດສອບວ່າມີສິນຄ້າ ID ຖືກລົບຫຼືບໍ່
      if (res.affectedRows == 0) {
        callback({ kind: "not_found" }, null);
        return;
      }

      callback(null, res);
    }
  );
};

// ລົບທຸກສິນຄ້າ
Product.removeAll = (callback) => {
  sql.query(
    "DELETE FROM products",
    callback
  );
};

// ສົ່ງອອກ Product ໃຫ້ controllers
module.exports = Product;