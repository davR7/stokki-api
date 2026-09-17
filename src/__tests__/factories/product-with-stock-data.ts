import { faker } from "@faker-js/faker";
import { ProductStatus } from "@/modules/product/product-status.enum";

export function makeProductWithStockData() {
  return {
    product: {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      sku: faker.string.alphanumeric(),
      status: ProductStatus.ACTIVE,
    },
    stock: {
      id: faker.string.uuid(),
      quantity: faker.number.int(),
      minimumQuantity: faker.number.int(),
    },
  };
}
