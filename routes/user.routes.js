const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.post(
        "/api/users",
        controller.createUser
    );
    app.post("/api/auth/signin", controller.signin);
    app.get("/api/users", controller.getUsers)
    app.get("/api/users/:id", controller.getUser)
    app.post("/api/users/:id", controller.updateUser)
    app.get("/api/roles", controller.getUserRoles)

};