module.exports = app => {
    const user = require('../controllers/user.controllers.js');
    app.post("/users", user.create);
    app.post("/users/login", user.login);
};