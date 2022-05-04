import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]

    jwt.verify(
      String(token),
      String(process.env.JWT_SECRET),
      (err: any, decoded: any) => {
        req.userEmail = decoded.email
        next()
      }
    )
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" })
  }
}
