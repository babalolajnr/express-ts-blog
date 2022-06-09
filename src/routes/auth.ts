import { Router } from "./router"
import express from "express"
import AuthController from "../controllers/auth";
import { validate } from "../app";
import registerSchema from "../validation/register";
import loginSchema from "../validation/login";

export class AuthRoutes extends Router {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
        this.configureRoutes();
    }

    configureRoutes(): express.Application {
        this.app.post('/login', validate(loginSchema),(req, res) => {
            AuthController.login(req, res);
        });
        this.app.post('/logout', (req, res) => {
            res.send('logout');
        });
        this.app.post('/register', validate(registerSchema), (req, res) => {
            AuthController.register(req, res);
        });
        return this.app;
    }
}