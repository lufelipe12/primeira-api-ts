import { User } from "../../entities/user.entity"
import { AppDataSource } from "../../data-source"

const getUsersService = async () => {
  try {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    return users
  } catch (error) {
    throw new Error("Something goes wrong")
  }
}

export default getUsersService
