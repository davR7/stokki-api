import mongoose from "mongoose";

const connectDB = async () => {
  const dbUri = process.env.MONGODB_URI;

  if (!dbUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  try {
    mongoose.connect(dbUri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(`Error connecting MongoDB: ${err}`);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB: disconnected");
});

mongoose.connection.on("error", () => {
  console.log("MongoDB: error");
});

export { connectDB };
