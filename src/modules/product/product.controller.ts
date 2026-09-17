import { Request, Response } from "express";
import { ProductUseCase } from "./product.use-case";

export class ProductController {
  constructor(private productUseCase: ProductUseCase) {}

  async handleCreate(req: Request, res: Response) {
    const output = await this.productUseCase.create(req.body);

    return res.status(201).json(output);
  }

  async handleList(req: Request, res: Response) {
    const { page = 1, limit = 5, search, categoryId } = req.query;

    const output = await this.productUseCase.list({
      page: Number(page),
      limit: Number(limit),
      search: search?.toString(),
      categoryId: categoryId?.toString(),
    });

    return res.json(output);
  }

  async handleListLowStock(_req: Request, res: Response) {
    const output = await this.productUseCase.listLowStock();

    return res.json(output);
  }
}
