import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { Router } from './routes/router'
import debug from 'debug';
import { AuthRoutes } from './routes/auth'
import dotenv from 'dotenv'
import { passport, authenticate } from './config/passport'
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';



dotenv.config()

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<Router> = [];
const debugLog: debug.IDebugger = debug('app');

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

// Validation middleware for Joi
const validate = (schema: Joi.Schema) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { error } = schema.validate(req.body);

    error ? res.status(422).send(error.details[0].message) : next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize())
app.use(expressWinston.logger(loggerOptions));

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

routes.push(new AuthRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

app.get('/welcome', authenticate, (req: express.Request, res: express.Response) => {
    res.send('Welcome to the API')
})

server.listen(port, () => {
    routes.forEach((route: Router) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    console.log(runningMessage);
});

const prisma = new PrismaClient()

export { prisma, validate }