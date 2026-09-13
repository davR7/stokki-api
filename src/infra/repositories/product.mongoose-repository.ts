import { Product } from "@/modules/product/product.entity";
import { ProductMapper } from "@/modules/product/product.mapper";
import { ProductRepository } from "@/modules/product/product.repository";
import { ProductModel } from "../database/models/product";

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
}
