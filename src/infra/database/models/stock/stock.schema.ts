import { Schema } from "mongoose";

export const stockSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    minimumQuantity: {
      type: Number,
      required: true,
    },
    productId: {
      type: String,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);
