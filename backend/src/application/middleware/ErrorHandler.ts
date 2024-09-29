import type { Response, Request, NextFunction } from 'express';
import { ValidateError } from 'tsoa';
import HttpError from './httpError';

const CACHE_CONTROL_VALUE =
    'private, no-cache, no-store, s-maxage=0, max-age=0, must-revalidate';

const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
): Response | void => {
    if (err instanceof ValidateError) {
        const httpError = HttpError.unprocessableContent(
            'Validation failed',
            `Caught Validation Error for ${req.path}: ${err.fields}`,
        );
        console.warn(httpError.hiddenContext);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', CACHE_CONTROL_VALUE);
        return res.status(httpError.statusCode).json(httpError.message);
    }

    if (err instanceof HttpError) {
        console.warn(err.name, err.hiddenContext);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', CACHE_CONTROL_VALUE);
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    if (err instanceof Error) {
        console.warn(err.message);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', CACHE_CONTROL_VALUE);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }

    next();
};

export default errorHandler;