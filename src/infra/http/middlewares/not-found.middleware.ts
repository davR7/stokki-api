import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "@/shared/error/not-found.error";

export class NotFoundErrorMiddleware {
  execute(req: Request, _res: Response, next: NextFunction) {
    const error = new NotFoundError(
      `Route ${req.method} ${req.originalUrl} not found`,
      "ROUTE_ERR_NOT_FOUND",
    );
    next(error);
  }
}
