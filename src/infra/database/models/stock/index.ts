import mongoose, { InferSchemaType } from "mongoose";
import { stockSchema } from "./stock.schema";

type StockProps = InferSchemaType<typeof stockSchema>;

export type StockDocument = StockProps;
export const StockModel = mongoose.model<StockProps>("Stock", stockSchema);
