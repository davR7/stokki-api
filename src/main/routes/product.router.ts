import { Router } from "express";
import { makeProductFactory } from "../factories/product.factory";
import { makeStockFactory } from "../factories/stock.factory";

export default (router: Router) => {
  router.post("/products", (req, res) => {
    return makeProductFactory().handleCreate(req, res);
  });

  router.get("/products", (req, res) => {
    return makeProductFactory().handleList(req, res);
  });

  router.patch("/products/:productId/stock", (req, res) => {
    return makeStockFactory().handleUpdate(req, res);
  });
};
