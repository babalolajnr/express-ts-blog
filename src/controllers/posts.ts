import { prisma } from "../app";
import express from "express"

export default class PostsController {

    public static async index(req: express.Request, res: express.Response): Promise<express.Response> {
        const posts = await prisma.post.findMany()
        return res.json({ posts });
    }

    public static async create(req: express.Request, res: express.Response): Promise<express.Response> {
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

    public static async update(req: express.Request, res: express.Response): Promise<express.Response> {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                title: title,
                content: content
            }
        });

        return res.json({ message: "Post Updated", post });
    }

    public static async delete(req: express.Request, res: express.Response): Promise<express.Response> {
        const { id } = req.params;

        const post = await prisma.post.delete({
            where: { id: parseInt(id) }
        });

        return res.json({ message: "Post Deleted" });
    }
}