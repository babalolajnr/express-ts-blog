"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.passport = void 0;
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
const passport_jwt_1 = require("passport-jwt");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const opts = {};
opts.jwtFromRequest = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
opts.issuer = process.env.TOKEN_ISSUER;
opts.audience = process.env.TOKEN_AUDIENCE;
passport_1.default.use(new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
    prisma.user.findFirst({ where: { email: jwt_payload.email } }).then(user => {
        console.log(user);
        done(null, user);
    }).catch(err => {
        console.log(err);
        done(err, false);
    });
}));
const authenticate = passport_1.default.authenticate('jwt', {
    session: false,
    // failureRedirect: '/login'
});
exports.authenticate = authenticate;
//# sourceMappingURL=passport.js.map