import type { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import type { CreateUserDTO, UpdateUserDTO } from '../models/dto/UserDTO'
import UserRepository from '../models/repositories/UserRepository'
import { createUserSchema, updateUserSchema } from '../models/validators/userSchemas'

export default class UserController {
  public readonly getAll = async (_req: Request, res: Response) => {
    const repository = new UserRepository()
    const users = await repository.findAll()
    res.json(users)
  }

  public readonly getById = async (req: Request, res: Response) => {
    const { id } = req.params

    const repository = new UserRepository()
    const user = await repository.findById(parseInt(id))

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.json(user)
  }

  public readonly create = async (req: Request, res: Response) => {
    const user: CreateUserDTO = req.body
    try {
      await createUserSchema.validateAsync(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
      return
    }

    const repository = new UserRepository()

    const hashedPassword = bcrypt.hashSync(user.password, 10)

    const newUser = repository.create({ ...user, password: hashedPassword })
    res.status(201).json(newUser)
  }

  public readonly update = async (req: Request, res: Response) => {
    const { id } = req.params
    const user: UpdateUserDTO = req.body

    try {
      await updateUserSchema.validateAsync(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
      return
    }

    const repository = new UserRepository()
    await repository.update(parseInt(id), user)

    res.sendStatus(204)
  }

  public readonly delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const repository = new UserRepository()
    await repository.delete(parseInt(id))

    res.sendStatus(204)
  }
}