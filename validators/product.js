import Joi from 'joi';

export const addProductValidator = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    ingredients:Joi.string().required(),
    usage:Joi.string().required(),
    desDetail: Joi.string(),
    categoryName: Joi.string().required(),
    quantity: Joi.number().required(),
    pictures: Joi.array().items(Joi.string().required())

})

export const replaceProductValidator = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    ingredients:Joi.string().required(),
    usage:Joi.string().required(),

    // image: Joi.string().required(),
    quantity: Joi.number().required(),
    pictures: Joi.array().items(Joi.string().required())

})