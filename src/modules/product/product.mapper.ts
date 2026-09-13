import { ProductDocument } from "@/infra/database/models/product";
import { ProductOutputDto } from "./product.dto";
import { Product } from "./product.entity";

export class ProductMapper {
  static toPersistence(input: Product): ProductDocument {
    return {
      _id: input.id,
      name: input.name,
      sku: input.sku,
      description: input.description,
      price: input.price,
      status: input.status,
      categoryId: input.categoryId,
      createdAt: input.createdAt,
    };
  }

  static toDomain(input: ProductDocument): Product {
    return Product.restore({
      id: input._id,
      name: input.name,
      sku: input.sku,
      description: input.description,
      price: input.price,
      status: input.status,
      categoryId: input.categoryId,
      createdAt: input.createdAt,
    });
  }

  static toUseCase(input: Product): ProductOutputDto {
    return {
      id: input.id,
      name: input.name,
      sku: input.sku,
      description: input.description,
      price: input.price,
      status: input.status,
      categoryId: input.categoryId,
      createdAt: input.createdAt,
    };
  }
}
