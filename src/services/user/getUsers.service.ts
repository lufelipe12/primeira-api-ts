import { User } from "../../entities/user.entity"
import { AppDataSource } from "../../data-source"

const getUsersService = async () => {
  try {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const usersToShow = users.map((user) => {
      return { id: user.id, name: user.name, email: user.email }
    })

    return usersToShow
  } catch (error) {
    throw new Error("Something goes wrong")
  }
}

export default getUsersService
