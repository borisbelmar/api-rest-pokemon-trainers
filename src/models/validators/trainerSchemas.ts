import Joi from 'joi'
import { CreateTrainerDTO, UpdateTrainerDTO } from '../dto/TrainerDTO'

export const createTrainerSchema: Joi.ObjectSchema<CreateTrainerDTO> = Joi.object().keys({
  nick: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.string().required(),
  pokemons: Joi.array().items(Joi.number()).required()
})

export const updateTrainerSchema: Joi.ObjectSchema<UpdateTrainerDTO> = Joi.object().keys({
  nick: Joi.string(),
  city: Joi.string(),
  phone: Joi.string(),
  pokemons: Joi.array().items(Joi.number())
})
