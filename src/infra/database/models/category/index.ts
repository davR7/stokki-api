import mongoose, { InferSchemaType } from "mongoose";
import { categorySchema } from "./category.schema";

type CategoryProps = InferSchemaType<typeof categorySchema>;

export type CategoryDocument = CategoryProps;
export const CategoryModel = mongoose.model<CategoryProps>("Category", categorySchema);
