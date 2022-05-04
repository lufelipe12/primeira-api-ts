import { Request, Response } from "express"
import createUserService from "../../services/user/createUser.service"
import userDeleteSelfService from "../../services/user/deleteUser.service"
import getUserService from "../../services/user/getUser.service"
import getUsersService from "../../services/user/getUsers.service"
import userLoginService from "../../services/user/login.service"
import userUpdatePasswordService from "../../services/user/updateUserPassword.service"

class UserController {
  static async store(req: Request, res: Response) {
    try {
      const { name, email, password } = req.newUser
      const newUser = await createUserService({ name, email, password })

      return res.status(201).json(newUser)
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(400)
          .json({ error: error.name, message: error.message })
      }
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const users = await getUsersService()

      return res.status(200).json(users)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        })
      }
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const email = req.userEmail
      const user = await getUserService(email)

      if (user === undefined) {
        return res.status(400).json({ error: "User cannot be found." })
      }

      return res.status(200).json({
        message: "User found",
        user: user,
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        })
      }
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const userLoggedIn = await userLoginService({ email, password })

      return res
        .status(200)
        .json({ message: "User login successfully", user: userLoggedIn })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        })
      }
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const email = req.userEmail

      const userDeleted = await userDeleteSelfService(email)

      return res
        .status(200)
        .json({ message: "User deleted successfully", user: userDeleted })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        })
      }
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const email = req.userEmail
      const { password } = req.body

      const user = await userUpdatePasswordService(email, password)

      return res.status(201).json({ message: "User updated", user: user })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        })
      }
    }
  }
}

export default UserController
