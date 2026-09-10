import { HttpError } from "./http.error";

export class NotFoundError extends HttpError {
  constructor(message: string, code: string) {
    super(message, code, 404);
    this.name = "NotFoundError";
  }
}
