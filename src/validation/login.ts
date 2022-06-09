import Joi from "joi";

const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(50).trim(true).regex(/[a-zA-Z0-9]{3,30}/),
})

export default loginSchema