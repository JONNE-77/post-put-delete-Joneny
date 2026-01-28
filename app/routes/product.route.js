module.exports = app => {
  const products = require("../controllers/product.controllers.js");
  const auth = require("../routes/authen.routes.js");

  // GET - ສະແດງທຸກສິນຄ້າ
  app.get("/products", auth, products.findAll);

  // POST - ສ້າງສິນຄ້າໃໝ່
  app.post("/products", auth, products.create);

  // GET - ສະແດງສິນຄ້າ ID ໂດຍລະບຸ ID
  app.get("/products/:id", auth, products.findOne);

  // PUT - ອັບເດດສິນຄ້າ
  app.put("/products/:id", auth, products.update);

  // DELETE - ລົບສິນຄ້າໂດຍລະບຸ ID
  app.delete("/products/:id", auth, products.delete);

  // DELETE - ລົບທຸກສິນຄ້າ
  app.delete("/products", auth, products.deleteAll);
};