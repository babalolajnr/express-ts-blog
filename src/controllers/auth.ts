import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../app';


export default class AuthController {

    public static async login(req: express.Request, res: express.Response): Promise<express.Response> {
        const { email, password } = req.body;

        const user = await prisma.user.findFirst({ where: { email: email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        const compare = await bcrypt.compare(password, user.password)

        if (compare == false) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        const payload = {
            email: user.email,
            name: user.name,
        }

        return res.send({
            token: 'Bearer ' + jwt.sign(payload, <string>process.env.SECRET_KEY, {
                expiresIn: process.env.TOKEN_EXPIRATION_TIME,
                issuer: process.env.TOKEN_ISSUER,
                audience: process.env.TOKEN_AUDIENCE,
            })
        })
    }


    public static async register(req: express.Request, res: express.Response): Promise<express.Response> {

        const { name, email, password } = req.body

        const exists = await prisma.user.findFirst({ where: { email: email } })

        if (exists) {
            return res.status(422).send({ message: 'Email already exists' })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password, salt)

        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hash
            }
        })

        return res.status(200).json({ message: 'User created successfully' })
    }
}