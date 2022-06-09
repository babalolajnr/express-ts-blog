"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const registerSchema = joi_1.default.object({
    name: joi_1.default.string().required().max(50).trim(true),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(8).max(50).trim(true).regex(/[a-zA-Z0-9]{3,30}/),
    confirmPassword: joi_1.default.string().required().valid(joi_1.default.ref('password'))
});
// const uniqueEmail = async (email: string) => {
//     const user = await prisma.user.findFirst({ where: { email: email } })
//     return user ? false : true
// }
exports.default = registerSchema;
//# sourceMappingURL=register.js.map