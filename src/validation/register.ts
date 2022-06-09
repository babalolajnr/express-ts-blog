import Joi from 'joi'

const registerSchema = Joi.object({
    name: Joi.string().required().max(50).trim(true),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(50).trim(true).regex(/[a-zA-Z0-9]{3,30}/),
    confirmPassword: Joi.string().required().valid(Joi.ref('password'))
})


export default registerSchema