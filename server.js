const express = require("express");
const app = express();

// ກໍານົດໃຫ້ server ອ່ານ JSON ແລະ URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ເຊື່ອມຕໍ່ database MySQL
const db = require("./app/models/db.js");

// Root route - ຕອບສະຫນອງ welcome message
app.get("/", (req, res) => {
    res.json({ message: "Welcome to NodeJS + Express + MySQL API." });
});

// ກຳນົດໃຫ້ໂຫຼດ routes ສໍາລັບ Products ແລະ Categories
require("./app/routes/product.route.js")(app);
require("./app/routes/category.route.js")(app);
require("./app/routes/user.routes.js")(app);

// ກໍານົດ port ແລະ ເປີດ server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`);
});