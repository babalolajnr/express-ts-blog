"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(422).send({ message: 'Please fill all the fields before submitting!' });
            }
            const user = yield prisma.user.findFirst({ where: { email: email } });
            if (!user) {
                return res.status(401).json({ error: 'Invalid Credentials' });
            }
            const compare = yield bcrypt_1.default.compare(password, user.password);
            if (compare == false) {
                return res.status(401).json({ error: 'Invalid Credentials' });
            }
            const payload = {
                email: user.email,
                name: user.name,
            };
            return res.send({
                token: 'Bearer ' + jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: process.env.TOKEN_EXPIRATION_TIME,
                    issuer: process.env.TOKEN_ISSUER,
                    audience: process.env.TOKEN_AUDIENCE,
                })
            });
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, confirmPassword } = req.body;
            const saltRounds = 10;
            if (password !== confirmPassword) {
                return res.status(400).json({ error: 'Passwords do not match' });
            }
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            const hash = yield bcrypt_1.default.hash(password, salt);
            const user = yield prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hash
                }
            });
            return res.status(200).json({ message: 'User created successfully' });
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.js.map