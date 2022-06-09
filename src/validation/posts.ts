import Joi from 'joi'

const createSchema = Joi.object({
    title: Joi.string().required().max(50).trim(true),
    content: Joi.string().required(),
})


export default createSchema