import { Router } from "express";
import { makeProductFactory } from "../factories/product.factory";

export default (router: Router) => {
  router.post("/products", (req, res) => {
    return makeProductFactory().handleCreate(req, res);
  });
};
