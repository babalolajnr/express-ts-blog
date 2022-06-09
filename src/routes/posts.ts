import { Router } from "./router"
import express from "express"
import { authenticate } from "../config/passport";
import PostsController from "../controllers/posts";
import { validate } from "../app";
import createSchema from "../validation/posts";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class PostRoutes extends Router {

    constructor(app: express.Application) {
        super(app, 'PostRoutes');
        this.configureRoutes();
    }

    configureRoutes(): express.Application {
        this.app.get('/posts', authenticate, (req, res) => {
            PostsController.index(req, res);
        })

        this.app.post('/posts/create', [authenticate, validate(createSchema)],
            (req: express.Request, res: express.Response) => {
                PostsController.create(req, res);
            })


        return this.app;
    }
}