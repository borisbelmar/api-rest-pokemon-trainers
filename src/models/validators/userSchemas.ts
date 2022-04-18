import Joi from 'joi'

export const createUserSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export const updateUserSchema = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string()
})

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})
