import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(404).json({
      status: "error",
      message: "No token found",
    })
  }

  const [type, token] = authorization.split(" ")

  jwt.verify(token, String(process.env.JWT_SECRET), (error, decoded) => {
    if (error) {
      return res.status(404).json({
        status: "error",
        message: "Invalid token",
      })
    }
    next()
  })
}

export default verifyAuthToken
