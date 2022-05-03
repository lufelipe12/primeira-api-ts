import { User } from "../../entities/user.entity"
import { ICreateUser } from "../../interfaces"
import { AppDataSource } from "../../data-source"

import bcrypt from "bcrypt"

const createUserService = async ({ name, email, password }: ICreateUser) => {
  try {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const emailAlreadyExists = users.find((user) => user.email === email)

    if (emailAlreadyExists) {
      throw new Error("Email already exists")
    }

    const userCreated = new User()
    userCreated.name = name
    userCreated.email = email
    userCreated.password = bcrypt.hashSync(password, 10)

    userRepository.create(userCreated)
    await userRepository.save(userCreated)
    return userCreated
  } catch (error) {
    throw new Error("Something goes wrong")
  }
}

export default createUserService
