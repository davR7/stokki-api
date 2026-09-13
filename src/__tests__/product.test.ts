import request from "supertest";
import { App } from "@/infra/http";
import { router } from "@/main/routes";
import { ProductInputDto } from "@/modules/product/product.dto";
import { ProductUseCase } from "@/modules/product/product.use-case";
import { ConflictError } from "@/shared/error/conflict.error";
import { NotFoundError } from "@/shared/error/not-found.error";
import { ProductStatus } from "@/modules/product/product-status.enum";

const productInput: ProductInputDto = {
  name: "Teclado Mecânico HyperX Alloy Origins Core",
  sku: "PER-HYP-ALLOY-001",
  description:
    "Teclado mecânico compacto com switches mecânicos, iluminação RGB e estrutura em alumínio.",
  price: 399.98,
  categoryId: "36cdb479-f8a4-480b-a52b-7c4c7c95c4db",
  stock: {
    quantity: 120,
    minimumQuantity: 40,
  },
};

const { stock, ...rest } = productInput;

const productOutput = {
  ...rest,
  id: crypto.randomUUID(),
  status: ProductStatus.ACTIVE,
  createdAt: new Date(),
};

describe("POST /products", () => {
  const app = new App(router).getInstance();

  test("deve retornar 201 e o produto", async () => {
    const productUseCaseMock = vi
      .spyOn(ProductUseCase.prototype, "create")
      .mockResolvedValueOnce(productOutput);

    const { statusCode, body } = await request(app).post("/products").send(productInput);

    expect(statusCode).toBe(201);

    expect(body).toEqual({
      ...productOutput,
      createdAt: productOutput.createdAt.toISOString(),
    });

    expect(productUseCaseMock).toHaveBeenCalledWith(productInput);
  });

  test("deve retornar 404 quando a categoria não existir", async () => {
    vi.spyOn(ProductUseCase.prototype, "create").mockRejectedValueOnce(
      new NotFoundError("Categoria não encontrada", "CATEGORY_ERR_NOT_FOUND"),
    );

    const { statusCode, body } = await request(app).post("/products").send(productInput);

    expect(statusCode).toBe(404);

    expect(body.message).toBe("Categoria não encontrada");
  });

  test("deve retornar 409 quando o SKU já estiver cadastrado", async () => {
    vi.spyOn(ProductUseCase.prototype, "create").mockRejectedValueOnce(
      new ConflictError("Produto já cadastrado", "PRODUCT_ERR_CONFLICT"),
    );

    const { statusCode, body } = await request(app).post("/products").send(productInput);

    expect(statusCode).toBe(409);

    expect(body.message).toBe("Produto já cadastrado");
  });
});
