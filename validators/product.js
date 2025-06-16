import Joi from 'joi';

export const addProductValidator = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    ingredients:Joi.string().required(),
    usage:Joi.string().required(),
    desDetail: Joi.string().optional(),
    categoryName: Joi.string().required(),
    quantity: Joi.number().required(),
    pictures: Joi.array().items(Joi.string().required())

})

export const updateProductValidator = Joi.object({
     name: Joi.string().optional(),
    price: Joi.number().optional(),
    description: Joi.string().optional(),
    ingredients:Joi.string().optional(),
    usage:Joi.string().optional(),
    desDetail: Joi.string().optional(),
    categoryName: Joi.string().optional(),
    quantity: Joi.number().optional(),
    pictures: Joi.array().items(Joi.string().optional())
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