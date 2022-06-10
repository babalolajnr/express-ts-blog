import { Router } from "./router"
import express from "express"
import { authenticate } from "../config/passport";
import PostsController from "../controllers/posts";
import { validate } from "../app";
import createSchema from "../validation/posts";

export class PostRoutes extends Router {

    constructor(app: express.Application) {
        super(app, 'PostRoutes')
        this.configureRoutes()
    }

    configureRoutes(): express.Application {
        this.app.get('/posts', authenticate, PostsController.index)
        this.app.post('/posts/create', [authenticate, validate(createSchema)], PostsController.create)
        this.app.patch('/posts/update/:id', [authenticate, validate(createSchema)], PostsController.update)
        this.app.patch('/posts/delete/:id', [authenticate], PostsController.delete)

        return this.app
    }
}