import { Router } from "./router"
import express from "express"
import AuthController from "../controllers/auth";
import RegisterValidation from "../validation/register";
import { validate } from "../app";

export class AuthRoutes extends Router {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
        this.configureRoutes();
    }

    configureRoutes(): express.Application {
        this.app.post('/login', (req, res) => {
            AuthController.login(req, res);
        });
        this.app.post('/logout', (req, res) => {
            res.send('logout');
        });
        this.app.post('/register', validate(RegisterValidation), (req, res) => {
            AuthController.register(req, res);
        });
        return this.app;
    }
}