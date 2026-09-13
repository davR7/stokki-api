import cors from "cors";
import express, { Application, Router } from "express";
import helmet from "helmet";
import { CatchAllMiddleware } from "./middlewares/catch-all.middleware";
import { NotFoundErrorMiddleware } from "./middlewares/not-found.middleware";

export class App {
  private app: Application = express();

  constructor(private router: Router = Router()) {
    this.setupLoaders();
    this.setupRouter();
    this.setupMiddlewares();
  }

  private setupLoaders() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
  }

  private setupRouter() {
    this.app.get("/health", (_req, res) => res.json({ status: "ok" }));
    this.app.use(this.router);
  }

  private setupMiddlewares() {
    this.app.use(new NotFoundErrorMiddleware().execute);
    this.app.use(new CatchAllMiddleware().execute);
  }

  getInstance() {
    return this.app
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`HTTP Server running at ${port}`);
    });
  }
}
