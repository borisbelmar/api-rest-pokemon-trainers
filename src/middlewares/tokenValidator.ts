import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../lib/jwt"

interface TokenValidatorOptions {
  adminOnly?: boolean
}

export default function tokenValidator(options?: TokenValidatorOptions) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      res.status(401).json({ message: "Missing authorization header" })
      return
    }

    const [, token] = authHeader.split(' ')

    try {
      const decoded = verifyToken(token)
      req.user = decoded
    } catch (err) {
      res.status(401).json({ message: "Missing authorization header" })
    }

    if (options?.adminOnly && !req.user.admin) {
      res.status(403).json({ message: "You need admin permissions" })
    }
    return next()
  }
}