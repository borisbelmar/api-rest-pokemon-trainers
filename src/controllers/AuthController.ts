import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/jwt";
import UserRepository from "../models/repositories/UserRepository";
import { CreateUserDTO } from "../models/dto/UserDTO";
import { createUserSchema, loginSchema } from "../models/validators/userSchemas";

export default class AuthController {
  public readonly login = async (req: Request, res: Response) => {
    const credentials = req.body

    try {
      await loginSchema.validateAsync(credentials)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }

    const repository = new UserRepository()
    const user = await repository.findByEmail(credentials.email)

    if (!user) {
      res.status(404).json({ message: "User not found" })
      return;
    }

    if (!bcrypt.compareSync(credentials.password, user.password)) {
      res.status(401).json({ message: "Invalid password" })
      return;
    }

    const token = generateToken(user)

    res.json({ token });
  }

  public readonly register = async (req: Request, res: Response) => {
    const user = req.body as CreateUserDTO

    const repository = new UserRepository()

    try {
      await createUserSchema.validateAsync(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
      return
    }

    const hashedPassword = bcrypt.hashSync(user.password, 10)

    const newUser = await repository.create({ ...user, password: hashedPassword })
    res.status(201).json(newUser)
  }
}