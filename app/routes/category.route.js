//ກໍານົດ API endpoints ສໍາລັບ categories
//  requests ໄປຫາ category controller

module.exports = app => {
  const categories = require("../controllers/category.controllers.js");

  // GET - ສະແດງທຸກປະເພດ, ຫມວດຫມູ່
  app.get("/categories", categories.findAll);

  // POST - ສ້າງໃໝ່
  app.post("/categories", categories.create);

  // PUT - ອັບເດດໂດຍລະບຸ ID
  app.put("/categories/:id", categories.update);

  // DELETE - ລົບໂດຍລະບຸ ID
  app.delete("/categories/:id", categories.delete);
};