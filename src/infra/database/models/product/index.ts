import mongoose, { InferSchemaType } from "mongoose";
import { productSchema } from "./product.schema";

type ProductProps = InferSchemaType<typeof productSchema>;

export type ProductDocument = Omit<ProductProps, "updatedAt">;
export const ProductModel = mongoose.model<ProductProps>("Product", productSchema);
