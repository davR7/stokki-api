import { HttpError } from "./http.error";

export class ConflictError extends HttpError {
  constructor(message: string, code: string) {
    super(message, code, 409);
    this.name = "ConflictError";
  }
}
