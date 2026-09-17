import { Product } from "@/modules/product/product.entity";
import { ProductMapper } from "@/modules/product/product.mapper";
import { ProductRepository } from "@/modules/product/product.repository";
import { ProductModel } from "../database/models/product";
import { Pagination } from "./ports/Pagination";
import { ProductList } from "./ports/ProductList";
import { ProductWithStock } from "./ports/ProductWithStock";

export class ProductMongooseRepository implements ProductRepository {
  async create(input: Product): Promise<Product> {
    const product = await ProductModel.create(ProductMapper.toPersistence(input));
    return ProductMapper.toDomain(product);
  }

  async findBySku(sku: string): Promise<Product | null> {
    const product = await ProductModel.findOne({ sku });
    if (!product) return null;
    return ProductMapper.toDomain(product);
  }

  async findAll({ page, limit, search, categoryId }: Pagination): Promise<ProductList> {
    const filter = {
      ...(categoryId && { categoryId }),
      ...(search && {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { sku: { $regex: search, $options: "i" } },
        ],
      }),
    };

    const products = await ProductModel.find(filter)
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await ProductModel.countDocuments();

    return {
      products: products.map((product) => ProductMapper.toDomain(product)),
      page,
      limit,
      total,
    };
  }

  async findLowStock(): Promise<ProductWithStock[]> {
    const products = await ProductModel.aggregate([
      {
        $lookup: {
          from: "stocks",
          localField: "_id",
          foreignField: "productId",
          as: "stock",
        },
      },
      {
        $unwind: "$stock",
      },
      {
        $match: {
          $expr: {
            $lte: ["$stock.quantity", "$stock.minimumQuantity"],
          },
        },
      },
    ]);

    return products.map((product) => ProductMapper.toDomainProductWithStock(product));
  }
}
