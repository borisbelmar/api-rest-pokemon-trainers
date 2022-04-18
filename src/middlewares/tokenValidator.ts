import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../lib/jwt"

export default async function tokenValidator(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verifyToken(token)

    req.user = decoded

    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}