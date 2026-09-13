import { ProductStatus } from "./product-status.enum";

export interface ProductInputDto {
  name: string;
  sku: string;
  description: string;
  price: number;
  categoryId: string;
  stock: {
    quantity: number;
    minimumQuantity: number;
  };
}

export interface ProductOutputDto extends Omit<ProductInputDto, "stock"> {
  id: string;
  status: ProductStatus;
  createdAt: Date;
}
