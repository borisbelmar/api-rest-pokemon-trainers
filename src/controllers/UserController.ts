import type { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import type { CreateUserDTO, UpdateUserDTO } from '../models/dto/UserDTO'
import UserRepository from '../models/repositories/UserRepository'
import { createUserSchema, updateUserSchema } from '../models/validators/userSchemas'

export default class UserController {
  public readonly getAll = async (_req: Request, res: Response) => {
    try {
      const repository = new UserRepository()
      const users = await repository.findAll()
      res.json(users)
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }

  public readonly getById = async (req: Request, res: Response) => {
    const { id } = req.params

    const repository = new UserRepository()
    try {
      const user = await repository.findById(parseInt(id))

      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }
      
      res.json(user)
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }

  public readonly create = async (req: Request, res: Response) => {
    const user: CreateUserDTO = req.body
    try {
      await createUserSchema.validateAsync(user)
    } catch (error) {
      res.status(400).json({ message: error.message })
      return
    }

    const repository = new UserRepository()

    const hashedPassword = bcrypt.hashSync(user.password, 10)
    
    try {
      const newUser = await repository.create({ ...user, password: hashedPassword })
      res.status(201).json(newUser)
    } catch (error) {
      if (error.code = 'P2002') {
        res.status(409).json({ message: 'User already exists' })
        return
      }
      console.log(error.message)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }

  public readonly update = async (req: Request, res: Response) => {
    const { id } = req.params
    const user: UpdateUserDTO = req.body

    if (!req.user.admin && parseInt(id) !== req.user.id) {
      res.status(403).json({ message: 'You cant edit this user' })
      return
    }

    try {
      await updateUserSchema.validateAsync(user)
    } catch (error) {
      res.status(400).json({ message: error.message })
      return
    }
    
    const userForUpdate = user.password ? { ...user, password: bcrypt.hashSync(user.password, 10) } : user

    const repository = new UserRepository()

    try {
      await repository.update(parseInt(id), userForUpdate)
      res.sendStatus(204)
    } catch (error) {
      if (error.code = 'P2002') {
        res.status(409).json({ message: 'User already exists' })
        return
      }
      console.log(error.message)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }

  public readonly delete = async (req: Request, res: Response) => {
    const { id } = req.params

    if (parseInt(id) === req.user.id) {
      res.status(403).json({ message: 'You cant delete yourself' })
      return
    }

    const repository = new UserRepository()
    try {
      await repository.delete(parseInt(id))
      res.sendStatus(204)
    } catch (error) {
      if (error.code = 'P2025') {
        res.status(404).json({ message: 'User not found' })
        return
      }
      console.log(error.message)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
}