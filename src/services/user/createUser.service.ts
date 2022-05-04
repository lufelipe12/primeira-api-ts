import { User } from "../../entities/user.entity"
import { AppDataSource } from "../../data-source"
import { ICreateUser } from "../../interfaces"

import bcrypt from "bcrypt"

const createUserService = async ({ name, email, password }: ICreateUser) => {
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
}

export default createUserService
