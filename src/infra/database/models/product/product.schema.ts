import { Schema } from "mongoose";

enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const productSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ProductStatus),
      required: true,
      default: ProductStatus.ACTIVE,
    },
    categoryId: {
      type: String,
      ref: "Category",
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: true,
    },
  },
);
