import passport from "passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const opts: any = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_KEY
opts.issuer = process.env.TOKEN_ISSUER
opts.audience = process.env.TOKEN_AUDIENCE

passport.use(new Strategy(opts, function (jwt_payload, done) {
    prisma.user.findFirst({ where: { email: jwt_payload.email } }).then(data => {
        const user = {
            id: data?.id, email: data?.email, name: data?.name
        }
        done(null, user)
    }).catch(err => {
        done(err, false)
    })
}))

const authenticate = passport.authenticate('jwt', {
    session: false,
    // failureRedirect: '/login'
})

declare global {
    namespace Express {
        interface User {
            id: number,
            email: string,
            name: string
        }
    }
}

export { passport, authenticate } 