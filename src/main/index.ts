import { connectDB } from "@/infra/database";
import { App } from "@/infra/http";
import { router } from "./routes";

const port = Number(process.env.PORT);

function startServer() {
  try {
    connectDB();
    const app = new App(router);
    app.listen(port);
  } catch (err) {
    console.log(`Failed server: ${err}`);
    process.exit(1);
  }
}

startServer();
