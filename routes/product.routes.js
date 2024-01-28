const controller = require("../controllers/product.controller");

module.exports = function(app) {
    app.post(
        "/api/products",
        controller.createProduct
    );

    app.get("/api/products", controller.getProducts)
    app.get("/api/products/:id", controller.getProduct)
    app.post("/api/products/:id", controller.updateProduct)
    app.get("/api/productRelations", controller.getProductRelations)

};