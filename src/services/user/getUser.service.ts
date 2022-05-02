import users from "../../database"

const getUsersService = async () => {
  try {
    return users
  } catch (error) {
    throw new Error("Something goes wrong")
  }
}

export default getUsersService
