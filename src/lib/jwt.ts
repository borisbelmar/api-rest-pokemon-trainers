import jwt from 'jsonwebtoken'
import { UserDTO, UserTokenPayload } from '../models/dto/UserDTO'

const secret = process.env.JWT_SECRET || 'secret'

export function generateToken(user: UserDTO): string {
  return jwt.sign(
    { id: user.id, email: user.email },
    secret,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): UserTokenPayload {
  const verified = jwt.verify(token, secret)
  return verified as UserTokenPayload
}
