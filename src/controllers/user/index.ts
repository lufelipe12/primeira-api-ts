import { Request, Response } from "express"
import createUserService from "../../services/user/createUser.service"
import getUsersService from "../../services/user/getUser.service"

class UserController {
  static async store(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body
      const newUser = await createUserService({ name, email, password })

      return res.status(201).json(newUser)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message)
      }
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const users = await getUsersService()

      return res.status(200).json(users)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message)
      }
    }
  }
}

export default UserController
