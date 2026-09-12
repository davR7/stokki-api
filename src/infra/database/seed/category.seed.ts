import { connectDB } from "../";
import { CategoryModel } from "../models/category";

const randomId = () => crypto.randomUUID();

const categories = [
  { _id: randomId(), name: "Hardware" },
  { _id: randomId(), name: "Periféricos" },
  { _id: randomId(), name: "Computadores e Notebooks" },
  { _id: randomId(), name: "Monitores e Telas" },
  { _id: randomId(), name: "Redes e Conectividade" },
  { _id: randomId(), name: "Energia e Proteção" },
  { _id: randomId(), name: "Acessórios e Cabos" },
];

async function seedCategories() {
  await connectDB();

  await CategoryModel.deleteMany({});

  await CategoryModel.insertMany(categories);

  console.log("categories seeded successfully");

  process.exit(0);
}

seedCategories();
