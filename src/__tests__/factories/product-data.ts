import { faker } from "@faker-js/faker";
import { ProductStatus } from "@/modules/product/product-status.enum";

export function makeProductData() {
  return {
    name: faker.commerce.productName(),
    sku: faker.string.alphanumeric(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    status: ProductStatus.ACTIVE,
    categoryId: faker.string.uuid(),
  };
}
