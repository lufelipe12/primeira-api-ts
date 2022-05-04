import { User } from "../../entities/user.entity"
import { AppDataSource } from "../../data-source"
import { IUserLogin } from "../../interfaces"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User)
  const users = await userRepository.find()
  const account = users.find((user) => user.email === email)

  if (!account) {
    throw new Error("Email or password incorrect")
  }

  if (!bcrypt.compareSync(password, account.password)) {
    throw new Error("Email or password incorrect")
  }

  const token: string = jwt.sign(
    { email: email },
    String(process.env.JWT_SECRET),
    { expiresIn: "1d" }
  )
  const loggedIn = { email: account.email, token: token }

  return loggedIn
}

export default userLoginService
