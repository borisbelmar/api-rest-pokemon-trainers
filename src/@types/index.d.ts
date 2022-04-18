import http from 'http'

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    user: {
      id: number
      email: string
    }
  }

  export interface Response extends http.ServerResponse, Express.Response {
    user: {
      id: number
      email: string
    }
  }
}