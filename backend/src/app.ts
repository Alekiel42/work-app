import 'reflect-metadata';
import express, { json, urlencoded } from 'express';
import { RegisterRoutes } from './application/routes/routes';
import errorHandler from './application/middleware/ErrorHandler';
const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

export const app = express();

app.use(cors(corsOptions));

app.use(
    urlencoded({
        extended: true,
    }),
);
app.use(json());

RegisterRoutes(app);

app.use(errorHandler);