import { User } from "../../entities/user.entity"
import { ICreateUser } from "../../interfaces"
import { AppDataSource } from "../../data-source"

const createUserService = async ({ name, email }: ICreateUser) => {
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

    return userCreated
  } catch (error) {
    throw new Error("Something goes wrong")
  }
}

export default createUserService
