import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
});

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
});