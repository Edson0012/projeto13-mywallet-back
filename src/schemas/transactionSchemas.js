import joi from "joi";

export const depositSchema = joi.object({
    value: joi.string().required().min(1).max(7),
    description: joi.string().required(),
})