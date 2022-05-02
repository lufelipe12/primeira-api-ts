import users from "../../database"
import { CreateUser } from "../../interfaces"
import { User } from "../../interfaces"

import { v4 as uuidv4 } from "uuid"

const createUserService = async ({ name, email, password }: CreateUser) => {
  try {
    const emailAlreadyExists = users.find((user) => user.email === email)

    if (emailAlreadyExists) {
      throw new Error("Email already exists")
    }

    const userCreated: User = { id: uuidv4(), name, email, password }

    users.push(userCreated)

    return userCreated
  } catch (error) {
    throw new Error("Something goes wrong")
  }
}

export default createUserService
