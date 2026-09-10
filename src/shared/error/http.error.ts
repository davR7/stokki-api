export class HttpError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
}
