import { User } from "../../entities/user.entity"
import { AppDataSource } from "../../data-source"

const getUserService = async (id: string) => {
  try {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const usersToShow = users.map((user) => {
      return { id: user.id, name: user.name, email: user.email }
    })

    const user = usersToShow.find((user) => user.id === id)

    return user
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
  }
}

export default getUserService
