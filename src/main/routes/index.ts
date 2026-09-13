import { Router } from "express";
import productRouter from "./product.router";

const router = Router();

productRouter(router);

export { router };
