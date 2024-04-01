import * as Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().min(4).max(250).allow(null),
    full_name: Joi.string().max(250).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
    photo_profile: Joi.string().allow(null),
    created_at: Joi.date(),
    updated_at: Joi.date()
})

export const loginSchema = Joi.object({
    username: Joi.string().min(4).max(250).allow(null),
    password: Joi.string().min(8).max(20).required()
})