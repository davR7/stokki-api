import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "@/shared/error/http.error";

export class CatchAllMiddleware {
  execute(error: Error, _req: Request, res: Response, _next: NextFunction) {
    const serverErr =
      process.env.NODE_ENV !== "production" ? error.message : "Internal Server Error";

    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ code: "VALIDATION_FAILED", statusCode: 400, message: error.issues[0].message });
    }

    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({
        code: error.code,
        statusCode: error.statusCode,
        message: error.message,
      });
    }

    res.status(500).json({ statusCode: 500, message: serverErr });
  }
}
