import type { Request, Response } from 'express'
import type { CreateTrainerDTO, UpdateTrainerDTO } from '../models/dto/TrainerDTO'
import { UserTokenPayload } from '../models/dto/UserDTO'
import TrainerRepository from '../models/repositories/TrainerRepository'
import { createTrainerSchema, updateTrainerSchema } from '../models/validators/trainerSchemas'

export default class TrainerController {
  public readonly getAll = async (req: Request, res: Response) => {
    const user = req.user as UserTokenPayload
    const repository = new TrainerRepository(user.id)
    const trainers = await repository.findAll()
    res.json(trainers)
  }

  public readonly getById = async (req: Request, res: Response) => {
    const { id } = req.params
    
    const user = req.user as UserTokenPayload
    const repository = new TrainerRepository(user.id)
    const trainer = await repository.findById(parseInt(id))

    if (!trainer) {
      res.status(404).json({ message: 'Trainer not found' })
      return
    }

    res.json(trainer)
  }

  public readonly create = async (req: Request, res: Response) => {
    const trainer: CreateTrainerDTO = req.body
    try {
      await createTrainerSchema.validateAsync(trainer)
    } catch (error) {
      res.status(400).json({ error: error.message })
      return
    }

    const user = req.user as UserTokenPayload
    const repository = new TrainerRepository(user.id)
    const newTrainer = await repository.create(trainer)

    res.status(201).json(newTrainer)
  }

  public readonly update = async (req: Request, res: Response) => {
    const { id } = req.params
    const trainer: UpdateTrainerDTO = req.body

    try {
      await updateTrainerSchema.validateAsync(trainer)
    } catch (error) {
      res.status(400).json({ error: error.message })
      return
    }

    const user = req.user as UserTokenPayload
    const repository = new TrainerRepository(user.id)

    await repository.update(parseInt(id), trainer)

    res.sendStatus(204)
  }

  public readonly delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const user = req.user as UserTokenPayload
    const repository = new TrainerRepository(user.id)

    await repository.delete(parseInt(id))

    res.sendStatus(204)
  }
}