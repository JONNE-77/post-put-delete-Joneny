//ກໍານົດ Category object ແລະ SQL queries
// ມີ  getAll, create, findById, updateById, remove

const sql = require("./db");

// Category Constructor - ສ້າງ category object
const Category = function (category) {
  this.cat_name = category.cat_name;      
  this.is_deleted = category.is_deleted; 
};

// ດາວໂຫຼດຕົວໂອວະລາຍທັງໝົດ (ປະກອບ deleted ຍູ່)
Category.getAll = (callback) => {
  sql.query(
    "SELECT * FROM category WHERE is_deleted = false",  // ໂດຍບໍ່ລວມ deleted items
    callback
  );
};

// ສ້າງໃໝ່
Category.create = (newCategory, callback) => {
  sql.query(
    "INSERT INTO category SET ?",  // INSERT ໂດຍ object
    newCategory,
    callback
  );
};

// ຊອກຫາ ID ໂດຍລະບຸ ID 
Category.findById = (id, callback) => {
  sql.query(
    "SELECT * FROM category WHERE id = ? AND is_deleted = false",
    id,
    callback
  );
};

// ອັບເດດ
Category.updateById = (id, category, callback) => {
  sql.query(
    "UPDATE category SET cat_name = ?, is_deleted = ? WHERE id = ?",
    [category.cat_name, category.is_deleted, id],
    (err, res) => {
      if (err) {
        callback(err, null);
        return;
      }
      // ກວດສອບວ່າມີ ID ຖືກ update ຫຼືບໍ່
      if (res.affectedRows == 0) {
        callback({ kind: "not_found" }, null);
        return;
      }
      callback(null, { id: id, ...category });
    }
  );
};

// ລົບ 
Category.remove = (id, callback) => {
  sql.query(
    "UPDATE category SET is_deleted = true WHERE id = ?",  
    id,
    (err, res) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        callback({ kind: "not_found" }, null);
        return;
      }
      callback(null, res);
    }
  );
};

// ສົ່ງອອກ Category ໃຫ້ controllers
module.exports = Category;