class HttpError extends Error {
    statusCode: number;
    hiddenContext: string | undefined;

    constructor(message: string, statusCode: number, hiddenContext?: string) {
        super(message);
        this.name = 'HttpError';
        this.statusCode = statusCode;
        this.hiddenContext = hiddenContext;
    }

    static badRequest(message: string, hiddenContext?: string): HttpError {
        return new HttpError(message, 400, hiddenContext);
    }

    static unauthorized(message: string, hiddenContext?: string): HttpError {
        return new HttpError(message, 401, hiddenContext);
    }

    static forbidden(message: string, hiddenContext?: string): HttpError {
        return new HttpError(message, 403, hiddenContext);
    }

    static notFound(message: string, hiddenContext?: string): HttpError {
        return new HttpError(message, 404, hiddenContext);
    }

    static unprocessableContent(
        message: string,
        hiddenContext?: string,
    ): HttpError {
        return new HttpError(message, 422, hiddenContext);
    }
}

export default HttpError;