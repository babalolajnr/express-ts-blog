import { prisma } from "../app";
import express from "express"

export default class PostsController {
    public static async index(req: express.Request, res: express.Response) {
        const posts = await prisma.post.findMany()
        return res.json({ posts });
    }

    public static async create(req: express.Request, res: express.Response) {
        const { title, content } = req.body;

        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
                author: {
                    connect: { id: req.user?.id }
                }
            }
        });
        return res.json({ post });
    }
}