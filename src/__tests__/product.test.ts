import request from "supertest";
import { App } from "@/infra/http";
import { router } from "@/main/routes";
import { ListProductOutputDto, ProductInputDto } from "@/modules/product/product.dto";
import { ProductUseCase } from "@/modules/product/product.use-case";
import { ProductStatus } from "@/modules/product/product-status.enum";
import { StockUseCase } from "@/modules/stock/stock.use-case";
import { ConflictError } from "@/shared/error/conflict.error";
import { NotFoundError } from "@/shared/error/not-found.error";
import { makeProductData } from "./factories/product-data";

const app = new App(router).getInstance();

const product = makeProductData();

const productInput: ProductInputDto = {
  ...product,
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

const stockInput = stock;

const stockOutput = {
  ...stock,
  id: crypto.randomUUID(),
  productId: crypto.randomUUID(),
};

describe("POST /products", () => {
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

describe("GET /products", () => {
  const createProductOuput = () => ({
    ...makeProductData(),
    id: crypto.randomUUID(),
    status: ProductStatus.ACTIVE,
    createdAt: new Date(),
  });

  const productList: ListProductOutputDto = {
    products: Array.from({ length: 5 }, createProductOuput),
    page: 1,
    limit: 5,
    total: 5,
  };

  test("deve retornar 200 e listar produtos", async () => {
    vi.spyOn(ProductUseCase.prototype, "list").mockResolvedValueOnce(productList);

    const { status, body } = await request(app).get("/products");

    expect(status).toBe(200);

    expect(body).toEqual({
      ...productList,
      products: productList.products.map((product) => ({
        ...product,
        createdAt: product.createdAt.toISOString(),
      })),
    });
  });

  test("deve passar os parâmetros de paginação para o caso de uso", async () => {
    const productUseCaseMock = vi
      .spyOn(ProductUseCase.prototype, "list")
      .mockResolvedValueOnce(productList);

    await request(app).get("/products").query({ page: 1, limit: 3 });

    expect(productUseCaseMock).toHaveBeenCalledWith(expect.objectContaining({ page: 1, limit: 3 }));
  });

  test("deve passar o parâmetro search para o caso de uso", async () => {
    const productUseCaseMock = vi
      .spyOn(ProductUseCase.prototype, "list")
      .mockResolvedValueOnce(productList);

    await request(app).get("/products").query({ search: "teclado" });

    expect(productUseCaseMock).toHaveBeenCalledWith(
      expect.objectContaining({
        search: "teclado",
      }),
    );
  });

  test("deve passar o parâmetro categoryId para o caso de uso", async () => {
    const productUseCaseMock = vi
      .spyOn(ProductUseCase.prototype, "list")
      .mockResolvedValueOnce(productList);

    await request(app)
      .get("/products")
      .query({ categoryId: "36cdb479-f8a4-480b-a52b-7c4c7c95c4db" });

    expect(productUseCaseMock).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryId: "36cdb479-f8a4-480b-a52b-7c4c7c95c4db",
      }),
    );
  });
});

describe("PATCH /products/productId/stock", () => {
  test("deve atualizar a quantidade e o valor minimo do estoque do produto", async () => {
    const stockUseCaseMock = vi
      .spyOn(StockUseCase.prototype, "update")
      .mockResolvedValueOnce(stockOutput);

    const { body } = await request(app)
      .patch(`/products/${stockOutput.productId}/stock`)
      .send(stockInput);

    expect(stockUseCaseMock).toHaveBeenCalledWith(stockOutput.productId, {
      quantity: stockInput.quantity,
      minimumQuantity: stockInput.minimumQuantity,
    });

    expect(body).toEqual(stockOutput);
  });

  test("deve retornar 404 quando o estoque não existir", async () => {
    vi.spyOn(StockUseCase.prototype, "update").mockRejectedValueOnce(
      new NotFoundError("Estoque do produto não encontrado", "STOCK_ERR_NOT_FOUND"),
    );

    const { statusCode } = await request(app)
      .patch(`/products/${stockOutput.productId}/stock`)
      .send(stockInput);

    expect(statusCode).toBe(404);
  });
});
