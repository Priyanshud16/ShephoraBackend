const express = require("express");
const productCreate = require("../controllers/ProducttReq/product-create.controller");
const productGet = require("../controllers/ProducttReq/product-get.controller");
const productCategories = require("../controllers/ProducttReq/product-getCategories.controller");
const productSingleProduct = require("../controllers/ProducttReq/product-getSingleProducts.controller");
const productRouter = express.Router();

productRouter.get("/", productGet);
productRouter.get("/categories", productCategories);
productRouter.get("/:id", productSingleProduct);
productRouter.post("/", productCreate);

module.exports = productRouter;